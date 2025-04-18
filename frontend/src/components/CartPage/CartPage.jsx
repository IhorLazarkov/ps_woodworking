import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) return <h2>Your cart is empty.</h2>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => alert("Purchase complete!")}>Checkout</button>
    </div>
  );
}
