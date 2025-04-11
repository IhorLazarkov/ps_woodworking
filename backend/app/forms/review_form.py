from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User, Product, Review, NumberRange

def is_reviewer_exists(form, field):
    #Check if reviewer exists
    user_id= field.data
    user = User.query.filter(User.id == user_id).first()

    if user is None:
        raise ValidationError("User does not exist")

def is_reviewer_owner(form, field):
    #Check if reviewer is not owner
    id = field.data # reviewer's id
    product_id = form.data['product_id'] # the product id as target for review
    product = Product.query.filter(Product.id == product_id).first()

    if id == product.user_id:
        raise ValidationError("Owner is not eligible to make a review of own product")

def is_reviewer_has_review_already(form, field):
    #Check reviewer has no review for the product   
    user_id = field.data # reviewer's id
    review = Review.query.filter(Review.user_id == user_id).first()

    if review:
        raise ValidationError("User is not eligible to make a review because there one review already")

class ReviewForm(FlaskForm):

    user_id = IntegerField("user_id", validators=[
        DataRequired("User should not be empty"),
        is_reviewer_exists,
        is_reviewer_owner,
        is_reviewer_has_review_already
        ])

    rating = IntegerField("rating",
        validators=[
            DataRequired("Rating should not be empty"),
            NumberRange(min =1, max =5, message = "Rating should be any number between 1 and 5 ")
        ])
    
    review = StringField("review",
        validators=[
            DataRequired("Review should not be empty"),
            Length(min = 1, max = 255, message = "Review message should not be empty or greater than 255 characters")
        ])