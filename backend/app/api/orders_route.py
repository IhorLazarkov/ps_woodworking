from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, Order_Item, Product
from app.forms.order_items_form import OrderForm, OrderItemForm

orders_routes = Blueprint("orders", __name__)

@orders_routes.route("/", methods=['POST'])
@login_required
def create_order():
    try:

        order = Order(user_id = current_user.id)
        db.session.add(order)
        db.session.flush()
        
        items = request.get_json()
        for item in items:
            product_id = item["product_id"]
            requested_quantity = item["quantity"]
            
            product = Product.query.filter(Product.id == product_id).first()
            if product is not None: 
                if product.quantity < requested_quantity \
                    and product.quantity - requested_quantity < 0:
                    raise ValueError("There are not enought quantity in the warehouse")
                
            order_item = Order_Item(
                    order_id = order.id,
                    product_id = product_id,
                    quantity = requested_quantity,
                    item_price = item["price"]
                )
            db.session.add(order_item)

            # decrease product quantity and update product
            target_quantity = product.quantity - requested_quantity
            product.quantity = target_quantity
            db.session.add(product)

        db.session.commit()
        
        return {"message": f"Order ID {order.id} is created successfully"}, 201
    except BaseException as e:
        db.session.rollback()
        return {"message": f"Failed to create an order: {e}"}, 500
