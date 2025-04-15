from sqlalchemy import func
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Product, Review, User

session_routes = Blueprint('sessions', __name__)

@session_routes.route("/products")
@login_required
def get_current_user_products():
    """
    Get all products of current user
    """
    response = []
    products = db.session.query(Product).filter_by(seller_id = current_user.id).all()

    for product in products:
        if product is not None:
            result = product.to_dict()
            stats = db.session.query(
                Review,
                func.count(Review.id).label("numOfReviews"),
                func.sum(Review.rating).label("totalRating")
            ).filter_by(product_id = product.id).first()
            if stats["numOfReviews"] != 0:
                result["avgRating"] = stats["totalRating"] / stats["numOfReviews"]
            else: result["avgRating"] = 0
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