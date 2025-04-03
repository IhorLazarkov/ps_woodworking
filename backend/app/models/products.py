from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Product(db.Model, UserMixin):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer)
    product_name = db.Column(db.varchar(50))
    product_price = db.Column(db.decimal(6,2))
    department = db.Column(db.varchar(50))
    quantity = db.Column(db.Integer)
    image = db.Column(db.url)
    description = db.Column(db.varchar(255))
    created_at = db.Column(db.DateTime, default=db.func.now())