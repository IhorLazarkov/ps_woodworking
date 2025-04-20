import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../context/CartContext";
import { toast } from 'react-toastify';
import { useFavorites } from "../../context/FavoritesContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorited } = useFavorites();

  return (
    <div className="product-card">
      <img
        src={product.previewImage}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-content">
        <div className="product-card-rating">
          <div className="product-card-name">
            <h3>{product.name}</h3>

          </div>
          <FontAwesomeIcon icon={faStar} /> {product.avgRating || "New"}
        </div>
        <button 
          className="favorite-button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFavorite(product);
          }}
        >
          {isFavorited(product.id) ? "❤️" : "🤍"}
        </button>
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

