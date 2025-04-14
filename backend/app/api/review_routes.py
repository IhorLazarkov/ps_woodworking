from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review, Product
from app.forms.review_form import ReviewForm

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete Review
    """
    review = Review.query.filter(Review.id == id).first()
    if review is None: return {"errors": {"message":"Review not found"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message":"Only owner is able to remove review"}}, 403
    
    db.session.delete(review)
    db.session.commit()

    return {"message": "success"}, 200

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    """
    Update Review
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized" } }, 401

    review = Review.query.filter(Review.id == id).first()
    print(f"ID: {id} Review: {review.to_dict()}")
    if review is None: return {"errors": {"message":"Review not found"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message":"Not eligibale for update review"}}, 401

    product = Product.query.filter(Product.id == review.product_id).first()

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review.rating = form.data["rating"]
        review.review = form.data["review"]
        review.user = current_user
        review.product = product

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    return {"errors": form.errors}, 500
