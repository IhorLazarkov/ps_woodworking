from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Order(db.Model, UserMixin):
    __tablename__ = 'Orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    order_date = db.Column(db.timestamp)
    shipping_address = db.Column(db.varchar(55))
    order_status = db.Column(db.varchar(55))
