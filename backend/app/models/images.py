from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    product = relationship("Product", back_populates="images")


    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "url": self.url,
            "preview": self.preview,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
