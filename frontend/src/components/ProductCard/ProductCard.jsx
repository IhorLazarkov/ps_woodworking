import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.previewImage}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-contnet">
        <div className="product-card-rating">
          <h3>{product.name}</h3>
          <FontAwesomeIcon icon={faStar} /> {product.avgRating || "New"}
        </div>
        <div className="product-card-price">${product.price}</div>
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

