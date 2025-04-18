import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";

function ProductCard({ product }) {
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
          <FontAwesomeIcon icon={faStar} /> {product.avgRating}
        </div>
        <div className="product-card-price">${product.price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
