from sqlalchemy import func
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, User, Review, Image
from app.forms.product_form import ProductForm
from app.forms.review_form import ReviewForm

product_routes = Blueprint('products', __name__)

@product_routes.route("/")
def get_products():
    """
    Get All Products
    """
    response = []
    products = Product.query.all()
    for product in products:
        # 1. provide info for product
        reply = product.to_dict()
        # 2. provide info average rating
        avgRating = db.session.query(
            func.count(Review.id).label("numOfRating"),
            func.sum(Review.rating).label("totalRating")
        ).filter_by(product_id = product.id).first()
        if avgRating["numOfRating"] == 0:
            reply["avgRating"] = 0
        else:
            reply["avgRating"] = avgRating["totalRating"] / avgRating["numOfRating"]
        # 3. provide preview url
        previewImage = Image.query.filter(Image.product_id == product.id and Image.preview == True).first()
        reply["previewImage"] = previewImage.url
        response.append(reply)
        
    return {'products': response}

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
        images = []
        images.append(Image(product = product, url = form.data["previewImage"], preview=True))
        if form.data["image1"] is not None: images.append(Image(product = product, url = form.data["image1"]))
        if form.data["image2"] is not None: images.append(Image(product = product, url = form.data["image2"]))
        if form.data["image3"] is not None: images.append(Image(product = product, url = form.data["image3"]))
        if form.data["image4"] is not None: images.append(Image(product = product, url = form.data["image4"]))
        if form.data["image5"] is not None: images.append(Image(product = product, url = form.data["image5"]))
        db.session.add(product)
        db.session.add_all(images)
        db.session.commit()
        
        return product.to_dict(), 201

    return {"message":form.errors}, 400

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
        
    return {"errors": form.errors }, 500

@product_routes.route("/<int:id>")
def get_product_details(id):
    """
    Get product details
    """
    product = db.session.query(Product, User, Image).filter(Product.id == id).join("user").join("images").first()

    if product is None:
        return {"errors": { "message": "Product not found"}}, 404
    
    result = product[0].to_dict()

    stats = db.session.query(
        func.count(Review.id).label("numOfRating"),
        func.sum(Review.rating).label("totalRatings")
    ).filter_by(product_id = id).first()
    
    if stats["numOfRating"] == 0:
        result["avgRating"] = 0
    else:
        result["avgRating"] = stats["totalRatings"] / stats["numOfRating"]
        
    result["numReview"] = stats["numOfRating"]
    result["seller"] = {
        "id": product[0].user.id,
        "userName": product[0].user.username,
        "firstName": product[0].user.first_name
    }
    result["productImages"] = [image.to_dict() for image in product[0].images]
    
    return result, 200

#
# REVIEWS
#
@product_routes.route("/<int:id>/reviews")
def get_product_reviews(id):

    product = Product.query.filter(Product.id == id).first()
    if product is None:
        return {"errors": {"message": "Product not found"}}, 404
    
    reviews = db.session.query(Review, Product, User).filter(Product.id == id).join("product").join("user").all()
    if reviews is not None:
        result = []
        for [review, product, user] in reviews:
            review = review.to_dict()
            review["user"] = {
                "id":user.id,
                "first_name":user.first_name
            }
            result.append(review)
            
        return {"reviews": result}, 200

    return {"errors": {"message":"failed"}}, 500

@product_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def add_review(id):
    """
    Create Review
    """
    if not current_user.is_authenticated:
        return { 'errors': { "message": "Unauthorized" } }, 401

    product = Product.query.filter(Product.id == id).first()
    if product is None: return {"errors": {"message":"Product not found"}}, 404

    # Prohibit owner
    if product.seller_id == current_user.id:
        return {"errors": {"message": "Owner is not allowed to make a review"}}, 403

    # Check if user has review already
    reviews = db.session.query(Review, Product).filter_by(product_id = id).join("product").all()
    for [review, products] in reviews:
            if review.user_id == current_user.id:
                return {"errors": {"message": "Only one review is allowed"}}, 403
    
    # Add review
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            rating = form.data["rating"],
            review = form.data["review"]
        )
        review.user = current_user
        review.product = product
        
        db.session.add(review)
        db.session.commit()

        result = review.to_dict()
        result["user"] = {"firt_name":current_user.first_name, "id": current_user.id}
        
        return result, 201

    return {"errors": form.errors}, 400