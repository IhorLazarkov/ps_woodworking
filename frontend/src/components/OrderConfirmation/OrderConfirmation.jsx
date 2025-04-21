import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await fetch(`/api/orders/${orderId}`, {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                setOrder(data.order);
            } else {
                setOrder(null);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (!order) return <h2>Loading order...</h2>;

    const total = order.items?.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
    );

    return (
        <div className="order-confirmation">
            <h2>Thank you for your order!</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.order_status}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Shipping to:</strong> {order.shipping_address}</p>
            
            <h3>Items:</h3>
            <ul>
                {order.items?.map((item) => (
                    <li key={item.id}>
                        <strong>{item.product_name}</strong> — Qty: {item.quantity} @ ${parseFloat(item.price).toFixed(2)}
                    </li>
                ))}
            </ul>

            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>
    );
};

export default OrderConfirmation;
