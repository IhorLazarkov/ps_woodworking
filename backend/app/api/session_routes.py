from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Product

session_routes = Blueprint('sessions', __name__)

@session_routes.route("/products")
@login_required
def get_current_user_products():
    products = Product.query.filter(Product.seller_id == current_user.id).all()
    return {"products": [product.to_dict() for product in products]}, 200