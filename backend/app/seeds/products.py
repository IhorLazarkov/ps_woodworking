from app.models import db, Product, environment, SCHEMA, User, Image
from sqlalchemy.sql import text



# Adds a demo product, you can add other products here if you want
def seed_products():
    user = User.query.filter(User.seller == True).first()
   
    items = [
        Product(seller_id=user.id, product_name='Chesse Board', product_price=10.99, department='Fun & Games', quantity=1, description='this game is so fun'),
        Product(seller_id=user.id, product_name='Cheese Board', product_price=15.99, department='Decorations', quantity=1, description='this cheese board is homemade'),
        Product(seller_id=user.id, product_name='Wooden Boat', product_price=10.99, department='Decorations', quantity=1, description='this Wooden Boat is well crafted'),
    ]
    
    images1  = [
        Image(product = items[0], url = 'https://m.media-amazon.com/images/I/418eXQzWF3L._AC_US100_.jpg', preview = True),
        Image(product = items[0], url = 'https://m.media-amazon.com/images/I/61hvx6t14PL._AC_US100_.jpg', preview = False),
        Image(product = items[0], url = "https://m.media-amazon.com/images/I/41+EiyWWToL._AC_US100_.jpg", preview = False),
        Image(product = items[0], url = "https://m.media-amazon.com/images/I/51uhA1DinjL._AC_US100_.jpg", preview = False)
    ]
    
    images2  = [
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51ctfwDl7BL._AC_US100_.jpg", preview = True),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51NN-2MY5uL._AC_US100_.jpg", preview = False),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51gZddjZPYL._AC_US100_.jpg", preview = False),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51AJkp3eT-L._AC_US100_.jpg", preview = False)
    ]
    
    images3  = [
        Image(product = items[2], url="https://m.media-amazon.com/images/I/41baRoB0L-L._AC_US40_.jpg", preview = True),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/41lMsz0WmiL._AC_US40_.jpg", preview = False),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/51dP7KnLmmL._AC_US40_.jpg", preview = False),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/41e3a8xZZ6L._AC_US40_.jpg", preview = False)
    ]
    
    db.session.add_all(items)
    db.session.add_all(images1)
    db.session.add_all(images2)
    db.session.add_all(images3)
    db.session.commit()



def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()

