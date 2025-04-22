from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Order, Order_Item
from flask_cors import cross_origin

order_routes = Blueprint("orders", __name__)

@order_routes.route("/", methods=["POST"])
@login_required
def create_order():
    data = request.get_json()
    cart_items = data.get("items", [])
    shipping_address = data.get("shipping_address", "")

    if not cart_items:
        return jsonify({"error": "Your cart is empty"}), 400

    # Create the order
    order = Order(
        user_id=current_user.id,
        shipping_address=shipping_address,
        order_status="processing"
    )
    db.session.add(order)
    db.session.flush()  # get order.id before adding order items

    # Create each order item
    for item in cart_items:
        order_item = Order_Item(
            order_id=order.id,
            product_id=item["id"],
            quantity=item["quantity"],
            item_price=item["price"]
        )
        db.session.add(order_item)

    db.session.commit()

    return jsonify({
        "message": "Order placed successfully",
        "order": order.to_dict()
    }), 201

@order_routes.route("/<int:order_id>")
@login_required
def get_order(order_id):
    order = Order.query.get(order_id)

    if not order or order.user_id != current_user.id:
        return {"error": "Order not found"}, 404

    order_dict = order.to_dict()

    # Add order items with product details
    items = Order_Item.query.filter_by(order_id=order.id).all()
    item_dicts = []

    for item in items:
        product = item.product
        item_data = item.to_dict()
        item_data["product_name"] = product.product_name
        item_dicts.append(item_data)

    order_dict["items"] = item_dicts

    return {"order": order_dict}

