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
      <div className="img-container">
        <img
          src={product.previewImage}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-rating">
          <FontAwesomeIcon icon={faStar} />
          {product.avgRating || "New"}
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
        <div className="product-card-content">
          <div className="product-card-name">
            <h3>{product.name}</h3>
          </div>
          <div className="product-card-price">
            ${product.price}
          </div>
        </div>
      </div>
      <p>{product.description}</p>
      <button
        className="primary"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          bottom: '-1.3em',
          right: '-2.8em',
          rotate: '-45deg',
          boxSizing: 'border-box',
          width: '120px',
          fontSize: '1.1em',
          padding: '0.4em 0 2em',
        }}
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
          toast.success((`${product.name} added to cart!`));
        }}
      >ADD</button>
    </div>
  );
}

export default ProductCard;

