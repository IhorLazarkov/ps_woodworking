import { useEffect, useRef, useState } from 'react';
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

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorited } = useFavorites();

  //State
  const hasReview = useRef(false)
  const isLoggedIn = useRef(false)
  const isProductOwner = useRef(false)
  const [productState, setProduct] = useState({})
  const [reviewsState, setReviews] = useState([])

  useEffect(() => {
    // Check logged in user is owner
    if (user !== null && productState.sellerId == user.id) isProductOwner.current = true
    // Fetch product details and reviews
    dispatch(fetchProductDetails(productId)).then((res) => {
      setProduct(res)
      dispatch(fetchProductReviews(productId)).then((reviews) => {
        //Is user has review already
        if (user !== null && user.id) {
          isLoggedIn.current = true
          for (const item of reviews) {
            if (item.user_id == user.id) {
              hasReview.current = true;
              break;
            }
          }
        }
        setReviews(reviews)
      })
    });
  }, [dispatch, productId]);

  if (!productState) return null;
  if (!productState.productImages) return null;

  return (
    <div className="all-product-details">
      <div className="product-details-info">
        <div className='product-images-div'>
          <div style={{ display: 'flex' }}>
            {productState.productImages.map((image, i) => {
              if (i === 0) return null;
              return <div
                className="img-container"
                style={{
                  border: "1px solid black",
                  marginLeft: "0.05em"
                }}
              >
                <img
                  key={image.id}
                  src={image.url}
                  alt={productState.name}
                />
              </div>
            })}
          </div>
          <div className="product-image-preview">
            <img
              src={productState.productImages.filter(i => i.preview = true)[0].url}
              alt={productState.name}
            />
          </div>
        </div>
        <div className='product-details-text'>
          <h1 className="product-details-title">
            {productState.name}
          </h1>
          <div className="product-description">
            <i>Description:</i>
            <p>{productState.description}</p>
          </div>
          <div>{
            productState.quantity > 0
              ? <span><i>Available quantity: </i>{productState.quantity}</span>
              : <span>Not available</span>
          }
          </div>
          <div className="price-review-title">
            <i>Price: </i>{`$${productState.price}`}
          </div>
          {productState.quantity > 0
            ?
            <button
              className="add-to-cart-btn primary"
              onClick={() => {
                addToCart(productState);
                toast.success(`${productState.name} added to cart!`);
              }}
            >
              Add to cart
            </button>
            : <button className='add-to-cart-btn disabled'> Add to cart</button>}
        </div>
      </div>

      <div className="line-break"></div>
      <span className="product-review">
        {productState.numReviews === 0
          ? "New"
          : <>Reviews<FontAwesomeIcon icon={faStar} />{productState.avgRating}</>
        }
      </span>

      {isLoggedIn.current && !isProductOwner.current && !hasReview.current && <OpenModalButton
        className='primary'
        buttonText="Add review"
        modalComponent={<ReviewForm productId={productId} />} />}
      {
        reviewsState && reviewsState.map(({ id, created_at, rating, review, user }) => {
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
