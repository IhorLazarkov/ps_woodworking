from app.models import db, User, Product, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    user = User.query.first()
    #find a prodcur where user is not owner
    product = Product.query.filter(Product.user_id != user.id).first()

    if product is None:
        print ("No product was found for user: " + user.to_dict())
        return
    
    review = Review(
        user.id,
        product.id,
        rating = 4,
        reviews = "This product is not so bad."
    )

    db.session.add(review)
    db.session.commit()

def undo_reviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        