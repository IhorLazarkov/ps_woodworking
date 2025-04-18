import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.previewImage}
        alt={product.product_name}
        className="product-card-image"
      />
      <div className="product-card-contnet">
        <div className="product-card-rating">
          <h3>{product.product_name}</h3>
          <FontAwesomeIcon icon={faStar} /> {product.avgRating}
        </div>
        <div className="product-card-price">${product.product_price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
