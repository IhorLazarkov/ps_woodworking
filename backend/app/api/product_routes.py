from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, User
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
        
        return product.to_dict(), 201

    return form.errors, 500

@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_product(id):
    """
    Delete Product
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized" } }, 401

    product = db.session.get(Product, id)

    if product is None:
        return {"errors": { "message": "Product was not found" }}, 404
    
    if product.seller_id == current_user.id:
        db.session.delete(product)
        db.session.commit()
        return {"message":"success"}, 200

    if product.seller_id != current_user.id:
        return { "errors": { "message":"Unathorized to delete"}}, 401
        
    return {"errors": {"message": "failed"}}, 500

@product_routes.route('/<int:id>', methods=['PUT'])
def update_product(id):
    """
    Update Product
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized"} }, 401

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = db.session.get(Product, id)

        if product is None:
            return {"errors": { "message": "Product not found" }}, 404
    
        if product.seller_id == current_user.id:
            product.product_name = form.data["product_name"]
            product.product_price = form.data["product_price"]
            product.department = form.data["department"]
            product.quantity = form.data["quantity"]
            product.description = form.data["description"]
            
            db.session.add(product)
            db.session.commit()
            return product.to_dict(), 200

        if product.seller_id != current_user.id:
            return { "errors": { "message":"Unathorized to update"}}, 401
    
    return {"errors": { "message":"failed" }}, 500

@product_routes.route("/<int:id>")
def get_product_details(id):
    product = db.session.query(Product, User).filter(id == id).join("user").first()

    if product is None:
        return {"errors": { "message": "Product not found"}}, 404
    
    result = product[0].to_dict()
    result["seller"] = {
        "id": product[0].user.id,
        "userName": product[0].user.username,
        "firstName": product[0].user.first_name
    }
    return result, 200