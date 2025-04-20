import { useCart } from "../../context/CartContext";
import "./cartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  if (cart.length === 0) return <h2 className="cart-title">We have so much wood to offer!</h2>;

  // Calculate full cart total
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="title-box">
        <h2 className="cart-title">Your Cart</h2>
      </div>

      <div className="cart-item-list">
        <ol>
          {cart.map(product => (
            <li key={product.id} style={{ marginBottom: "16px" }}>
              <strong>{product.name}</strong> — ${product.price.toFixed(2)}

              <div className="quantity-remove">
                {/* Quantity dropdown */}
                <label>
                  Quantity:{" "}
                  <select
                    value={product.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      const diff = newQuantity - product.quantity;
                      for (let i = 0; i < Math.abs(diff); i++) {
                        if (diff > 0) addToCart(product);
                        else removeFromCart(product.id);
                      }
                    }}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Remove button */}
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </li>

          ))}
        </ol>
      </div>

      {/* Grand total only */}
      <div className="grand-total">
        <h3>Grand Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="clear-checkout-buttons">

        <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
        <button className="checkout" onClick={() => alert("Coming Soon!")}>Checkout</button>
      </div>
    </div>
  );
}



