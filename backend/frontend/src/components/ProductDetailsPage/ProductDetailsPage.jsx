import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/products';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { FaHeart } from "react-icons/fa";
import './ProductDetailsPage.css';
import { createProductReview, fetchProductReviews } from '../../redux/reviews';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';

export const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const product = useSelector((state) => state.products.productDetails);
  const reviews = useSelector((state) => state.reviews);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorited } = useFavorites();
  const [hasReview, setHasReview] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProductOwner, setIsProductOwner] = useState(false)

  useEffect(() => {
    dispatch(fetchProductDetails(productId)).then(() => {
      dispatch(fetchProductReviews(productId)).then(() => {
        console.log("Loading of products details with reviews completed");
      })
    });
  }, [dispatch, productId]);

  useEffect(() => {
    // Check logged in user is owner
    if (product.sellerId == user.id) setIsProductOwner(true)
  }, [product])

  useEffect(() => {
    //Hack: for some reason hasReview remains true after navigating from dproduct with current user's review
    setHasReview(false)

    if (user && user.id) setIsLoggedIn(true)
    for (const item of reviews) {
      if (item.user_id == user.id) {
        setHasReview(true);
        break;
      }
    }

    console.log({ isLoggedIn, hasReview, isProductOwner });
  }, [reviews])

  if (!product) return null;
  if (!product.productImages) return null;
  // if (reviews.length == 0) return null;

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
            {product.avgRating ? Number(product.avgRating).toFixed(2) : "New"}
            {product.numReviews ? ` · ${product.numReviews} Reviews` : ''}
          </p>

          <div className="product-description">
            <p>{product.description}</p>
          </div>
          <span >{`Available Quantity: ${product.quantity}`}</span>
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

              {/* <button className="purchase-btn">Purchase</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="line-break"></div>
      <h3>{product.avgRating > 0 ? "Reviews" : 'New'}</h3>
      {isLoggedIn && !isProductOwner && !hasReview && <OpenModalButton
        className='primary'
        buttonText="Add review"
        modalComponent={<ReviewForm productId={productId} />} />}
      {
        reviews && reviews.map(({ id, created_at, rating, review, user }) => {
          return <div className="review-content" key={id}>
            <div className="review-heading">
              <p className="review-title">
                {user.first_name} commented on {created_at} <FontAwesomeIcon icon={faStar} />{rating}
              </p>
              <div>{review}</div>
            </div>
          </div>
        })
      }
    </div>
  );
}

function ReviewForm({ productId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [rating, setRating] = useState(1)
  const [review, setReview] = useState('')

  const onCreateHandler = () => {
    const newReview = {
      rating,
      review
    }
    dispatch(createProductReview(productId, newReview)).then(() => {
      closeModal()
      navigator({ to: `/products/${productId}` })
    })
  }
  return (
    <div style={{
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    }}>
      <h3 style={{ alignSelf: "center" }}>Add Review</h3>
      <label htmlFor="message"></label>
      <textarea
        id="message"
        value={review}
        placeholder='add review here ...'
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <label htmlFor="rating">Rating</label>
      <input
        id="rating"
        min="1"
        max="5"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button
        style={{ alignSelf: "center", cursor: "pointer" }}
        className="primary"
        onClick={onCreateHandler}>Create</button>
      <button
        style={{ alignSelf: "center", cursor: "pointer" }}
        className="nutral"
        onClick={closeModal}>Cancel</button>
    </div>
  )
}

export default ProductDetails;
