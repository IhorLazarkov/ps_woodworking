from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

def checkImageExtention(form, field):
    """
    Check that url finishs with image related extentions when not empty
    """
    print(f"Field value: {field.data}")
    if field.data == '' or field.data is None: return

    if not field.data.endswith('.jpg') \
        and not field.data.endswith('.jpeg') \
        and not field.data.endswith('.png'):
            raise ValidationError(f'Url "{field.data}" has to end with either *.jpg or *.jpeg or *.png')
            

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
            ], choices=CHOICES)
    quantity = IntegerField('Quantity', 
        validators=[
            DataRequired("Please enter a quantity"),
            NumberRange(min=1, message="Quantity has to be greater than 0")
            ])
    description = StringField('Description', 
        validators=[
            DataRequired("Product must have a description"),
            Length(min=10, max=255, message="Description needs to be at least 10 characters")
            ])
    previewImage = StringField("Preview Image", 
            validators=[
                DataRequired("Preview image should not be empty"),
                checkImageExtention])
    image1 = StringField("Image 1", validators=[checkImageExtention])
    image2 = StringField("Image 2", validators=[checkImageExtention])
    image3 = StringField("Image 3", validators=[checkImageExtention])
    image4 = StringField("Image 2", validators=[checkImageExtention])
    image5 = StringField("Image 3", validators=[checkImageExtention])