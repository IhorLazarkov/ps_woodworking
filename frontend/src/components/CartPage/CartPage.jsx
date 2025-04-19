import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  if (cart.length === 0) return <h2>Your cart is empty.</h2>;

  // Calculate full cart total
  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(product => (
          <li key={product.id} style={{ marginBottom: "16px" }}>
            <strong>{product.name}</strong> — ${product.price.toFixed(2)}

            <div
              style={{
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
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
      </ul>

      {/* ✅ Grand total only */}
      <h3>Cart Total: ${totalPrice.toFixed(2)}</h3>

      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => alert("Coming Soon!")}>Checkout</button>
    </div>
  );
}



