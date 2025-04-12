from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange



CHOICES = ["Furniture", "Decorations", "Fun & Games"]
class ProductForm(FlaskForm):

    product_name = StringField('Product Name', 
        validators=[
            DataRequired("Product must have a name")
            ])
    product_price = DecimalField('Price', places=2, rounding=None, 
        validators=[
            DataRequired("Please enter a price greater than $0.00"),
            NumberRange(min=0.01, message="price must be greater than 0")
            ])
    department = SelectField('Department', 
        validators=[
            DataRequired("Please specify a department for your product")
            ], choices=[CHOICES])
    quantity = IntegerField('Quantity', 
        validators=[
            DataRequired("Please enter a quantity"),
            NumberRange(min=1, message="Quantity has to be greater than 0")
            ])
    description = StringField('Description', 
        validators=[
            DataRequired("Product must have a description"),
            Length(min=10, max=255, message="Description needs to be at least 50 characters")
            ])
    
    
