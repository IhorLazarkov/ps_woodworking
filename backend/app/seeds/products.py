from app.models import db, Product, environment, SCHEMA, User, Image
from sqlalchemy.sql import text



# Adds a demo product, you can add other products here if you want
def seed_products():
    user = User.query.filter(User.seller == True).first()
   
    items = [
        Product(seller_id=user.id, product_name='Chess Board', product_price=10.99, department='Fun & Games', quantity=1, description='this game is so fun'),
        Product(seller_id=user.id, product_name='Cheese Board', product_price=15.99, department='Decorations', quantity=1, description='this cheese board is homemade'),
        Product(seller_id=user.id, product_name='Wooden Boat', product_price=10.99, department='Decorations', quantity=1, description='this Wooden Boat is well crafted'),
    ]
    
    images1  = [
        Image(product = items[0], url = 'https://images-na.ssl-images-amazon.com/images/I/41vTLAUlSTL._AC_UL330_SR330,330_.jpg', preview = True),
        Image(product = items[0], url = 'https://images-na.ssl-images-amazon.com/images/I/41vTLAUlSTL._AC_UL165_SR165,165_.jpg', preview = False),
        Image(product = items[0], url = "https://images-na.ssl-images-amazon.com/images/I/71bV4QvczSL._AC_UL165_SR165,165_.jpg", preview = False),
        Image(product = items[0], url = "https://images-na.ssl-images-amazon.com/images/I/71EwxYN4VvL._AC_UL165_SR165,165_.jpg", preview = False)
    ]
    
    images2  = [
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/81mWoXBoH5L._AC_SX679_.jpg", preview = True),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51S7HffrkZL._AC_SY100_.jpg", preview = False),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51JCIF8sbnL._AC_US100_.jpg", preview = False),
        Image(product = items[1], url = "https://m.media-amazon.com/images/I/51m8uvgNefL._AC_US100_AA50_.jpg", preview = False)
    ]
    
    images3  = [
        Image(product = items[2], url="https://images-na.ssl-images-amazon.com/images/I/81yGzrk4DYL._AC_UL348_SR348,348_.jpg", preview = True),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/41fNZIKbbvL._AC_US100_.jpg", preview = False),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/41qrtQISqSL._AC_US100_.jpg", preview = False),
        Image(product = items[2], url="https://m.media-amazon.com/images/I/318V2M2HnbL._AC_US100_.jpg", preview = False)
    ]
    
    db.session.add_all(items)
    db.session.add_all(images1)
    db.session.add_all(images2)
    db.session.add_all(images3)
    db.session.commit()



def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()

