import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/CartContext";
import { toast } from 'react-toastify';
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
      <div className="product-card-content">
        <div className="product-card-rating">
          <h3>{product.name}</h3>
          <FontAwesomeIcon icon={faStar} /> {product.avgRating || "New"}
        </div>
        <div className="product-card-price">${product.price}</div>
        <button
          className="add-to-cart-button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart(product);
            toast.success((`${product.name} added to cart!`));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

