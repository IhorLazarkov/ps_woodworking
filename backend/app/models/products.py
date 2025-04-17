from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_name = db.Column(db.String(50), nullable = False)
    product_price = db.Column(db.Numeric(precision=8, scale = 2), default = 0)
    department = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Integer, default = 0)
    description = db.Column(db.String(255), nullable = False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    user = relationship("User", back_populates="products")
    order_items = relationship('Order_Item', back_populates='products', cascade="all, delete")
    reviews = relationship("Review", back_populates="product", cascade="all, delete")
    images = relationship("Image", back_populates="product", cascade = "all, delete")
    
    def to_dict(self):
        return {
            "id": self.id,
            "sellerId":self.seller_id,
            "name": self.product_name,
            "price": self.product_price,
            "department": self.department,
            "quantity": self.quantity,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
