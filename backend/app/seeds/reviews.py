from app.models import db, User, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    user = User.query.first()
    product = Product.query.first()
    Product(
        user.id,
        product.id,
        rating = 4,
        reviews = "This product is not so bad."
    )

    db.session.add(product)
    db.session.commit()

def undo_reviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))