from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError

CHOICES = []
class ProductForm(FlaskForm):

    product_name = StringField('Product Name', validators=[DataRequired()])
    product_price = DecimalField('Price', places=2, rounding=None, validators=[DataRequired()])
    department = SelectField('Departmen', validators=[DataRequired()], choices=[CHOICES])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()],)
    
    
