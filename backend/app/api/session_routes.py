from sqlalchemy import func
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product, Review, User, Image

session_routes = Blueprint('sessions', __name__)

@session_routes.route("/products")
@login_required
def get_current_user_products():
    """
    Get all products of current user
    """
    response = []
    products = db.session.query(Product).filter_by(seller_id=current_user.id).all()

    for product in products:
        if product is None:
            continue

        result = product.to_dict()

        # Safely calculate rating stats
        rating_stats = db.session.query(
            func.count(Review.id).label("numOfReviews"),
            func.coalesce(func.sum(Review.rating), 0).label("totalRating")
        ).filter(Review.product_id == product.id).first()

        if rating_stats.numOfReviews == 0:
            result["avgRating"] = 0
        else:
            result["avgRating"] = rating_stats.totalRating / rating_stats.numOfReviews

        # Get preview image safely
        preview_image = (
            db.session.query(Image)
            .filter(Image.product_id == product.id, Image.preview == True)
            .first()
        )
        result["previewImage"] = preview_image.url if preview_image else ""

        response.append(result)

    return {"products": response}, 200


@session_routes.route("/reviews")
@login_required
def get_current_reviews():
    """
    Get Current User Reviews
    """
    reviews = db.session.query(
        Review,
        User,
        Product
    ).filter_by(user_id = current_user.id).join("user").join("product")

    if reviews is None: return {"reviews": []}, 200

    response = []
    for [review, user, product] in reviews:
        result = review.to_dict()
        result["user"] = user.to_dict()
        result["product"] = product.to_dict()
        response.append(result)

    return {"reviews": response}, 200