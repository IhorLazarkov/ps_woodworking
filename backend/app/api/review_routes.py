from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Review

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