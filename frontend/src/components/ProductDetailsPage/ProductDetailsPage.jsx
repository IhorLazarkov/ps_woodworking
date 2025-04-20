import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { FaHeart } from "react-icons/fa";
import './ProductDetailsPage.css';
import { fetchProductReviews } from '../../redux/reviews';

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetails);
  const reviews = useSelector((state) => state.reviews)
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    dispatch(fetchProductDetails(productId)).then(() => {
      dispatch(fetchProductReviews(productId)).then(() => {
        console.log("Roading of products details with reviews completed");
      })
    });
  }, [dispatch, productId]);

  if (!product) return null;
  if (!product.productImages) return null;
  if (!reviews) return null;

  return (
    <div className="all-product-details">
      <div className="product-main-titles">
        <h1 className="product-details-title">{product.name}</h1>
      </div>

      <div className="product-details-info">
        <div className='product-image-div'>
          <img
            src={product.productImages.filter(i => i.preview = true)[0].url}
            alt={product.name}
            className="product-card-image"
          />
        </div>
        <div className='product-details-text'>

          <p className="product-review">
            <FontAwesomeIcon icon={faStar} />{' '}
            {product.avgRating || 'New'}
            {product.numReviews ? ` · ${product.numReviews} Reviews` : ''}
          </p>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="purchase-product-div">
            <div className="price-review-title">
              <p className="purchase-price">{`$${product.price}`}</p>
            </div>
            <div className='buttons'>
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(product)}
              >
                <FaHeart color={isFavorited(product.id) ? "red" : "lightgray"} />
              </button>
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart!`);
                }}
              >
                Add to Cart
              </button>

              <button className="purchase-btn">Purchase</button>
            </div>
          </div>
        </div>
      </div>

      <div className="line-break"></div>

      <h3>{product.avgRating > 0 ? "Reviews" : 'New'}</h3>
      {
        reviews && reviews[product.id].map(({ created_at, rating, review, user }) => {
          return <div className="review-content">
            <div className="review-heading">
              <p className="review-title">
                {user.firstName} commented on {created_at} <FontAwesomeIcon icon={faStar} />{rating}
              </p>
              <div>{review}</div>
            </div>
          </div>
        })
      }
    </div>
  );
}

export default ProductDetails;
