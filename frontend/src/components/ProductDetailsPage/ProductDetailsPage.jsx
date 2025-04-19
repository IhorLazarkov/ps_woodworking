import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetailsPage.css';

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetails);
  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  if (!product) return null;
  if (!product.productImages) return null;

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

      {/* <div className="review-content">
        <div className="review-heading">
        <p className="review-title">
        <FontAwesomeIcon icon={faStar} /> {product.avgRating || 'New'}{' '}
        {product.numReviews
        ? `· ${product.numReviews} Reviews`
        : ''}
        </p>
        </div>
        </div> */}
    </div>
  );
}

export default ProductDetails;
