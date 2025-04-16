from app.models import db, User, Product
from sqlalchemy.sql import text
from app.models.db import environment, SCHEMA

def seed_favorites():
    users = User.query.all()
    products = Product.query.all()

    if not users or not products:
        print("Users and products must be seeded first.")
        return

    # Simulate favorites: Each user favorites 2–3 random products they didn't create
    for user in users:
        non_owned_products = [p for p in products if p.seller_id != user.id]
        if not non_owned_products:
            continue

        for product in non_owned_products[:3]:  # First 3 non-owned products
            user.favorite_products.append(product)

    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
    db.session.commit()
