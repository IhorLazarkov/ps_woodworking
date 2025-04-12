from app.models import db, Product, environment, SCHEMA, User
from sqlalchemy.sql import text



# Adds a demo product, you can add other products here if you want
def seed_products():
    user = User.query.first()
    items = [
        Product(seller_id=user.id, product_name='Chess Board', product_price=10.99, department='Fun & Games', quantity=1, description='this game is so fun'),
        Product(seller_id=user.id, product_name='Cheese Board', product_price=15.99, department='Decorations', quantity=1, description='this cheese board is homemade'),
        Product(seller_id=user.id, product_name='Wooden Boat', product_price=10.99, department='Decorations', quantity=1, description='this Wooden Boat is well crafted'),

    ]
    
    
    db.session.add_all(items)
    db.session.commit()



def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()

