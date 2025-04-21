import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductReview, fetchProductReviews } from "../../redux/reviews";
import { fetchProductDetails } from "../../redux/products";
import { useModal } from "../../context/Modal";
import { toast } from "react-toastify";
import "./CreateReviewModal.css";

const CreateReviewModal = ({ productId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(createProductReview(productId, { review, rating }));
      await dispatch(fetchProductReviews(productId)); // refresh reviews
      await dispatch(fetchProductDetails(productId));
      toast.success("Review submitted!");
      closeModal();
    } catch (err) {
      const data = await err.json?.();
      setErrors(data?.errors || { message: "Something went wrong" });
    }
  };
  

  return (
    <div className="create-review-modal">
      <h2>Write a Review</h2>
      {errors.message && <p className="error">{errors.message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button type="submit" disabled={rating === 0 || review.length < 5}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReviewModal;