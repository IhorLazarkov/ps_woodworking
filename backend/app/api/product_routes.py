from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product
from app.forms.product_form import ProductForm

product_routes = Blueprint('products', __name__)

@product_routes.route("/")
def get_products():
    """
    Get All Products
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route("/", methods=['POST'])
@login_required
def create_product():
    """
    Create New Product
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized" } }, 401
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            seller_id = current_user.id,
            product_name = form.data["product_name"],
            product_price = form.data["product_price"],
            department = form.data["department"],
            quantity = form.data["quantity"],
            description = form.data["description"]
            )
        db.session.add(product)
        db.session.commit()
        
        return {"message":"success"}, 201

    return form.errors, 500

@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    """
    Delete Product
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized" } }, 401

    product = Product.query.filter(Product.id == id).first()
    if product and product.seller_id == current_user.id:
        db.session.delete(product)
        db.session.commit()
        return {"message":"success"}, 200
        
    return {"errors": {"message": "failed"}}, 500
