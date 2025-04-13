from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):

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