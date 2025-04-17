from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product

favorite_routes = Blueprint('favorites', __name__)

#  Get all favorite products for current user
@favorite_routes.route('/')
@login_required
def get_favorites():
    return [product.to_dict() for product in current_user.favorite_products]


#  Add a product to favorites
@favorite_routes.route('/<int:product_id>', methods=['POST'])
@login_required
def add_favorite(product_id):
    product = Product.query.get_or_404(product_id)

    if product in current_user.favorite_products:
        return {"message": "Product is already in favorites."}, 400

    current_user.favorite_products.append(product)
    db.session.commit()
    return {"message": "Product added to favorites."}, 200


# Remove a product from favorites
@favorite_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    product = Product.query.get_or_404(product_id)

    if product not in current_user.favorite_products:
        return {"message": "Product not in favorites."}, 404

    current_user.favorite_products.remove(product)
    db.session.commit()
    return {"message": "Product removed from favorites."}, 200
