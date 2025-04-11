from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo product, you can add other products here if you want
def seed_products():
    demo1 = Product(
        username='Demo', email='demo@aa.io', password='password')
    demo2 = Product(
        username='marnie', email='marnie@aa.io', password='password')
    demo3 = Product(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()



def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()

