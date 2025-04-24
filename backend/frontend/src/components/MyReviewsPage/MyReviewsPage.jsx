import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductReview, fetchCurrentReviews, updateReviewAction } from "../../redux/reviews"
import './MyReviews.css'
import OpenModalButton from "../OpenModalButton"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"

function MyReviewsPage() {

    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchCurrentReviews()).then(() => { })
    }, [dispatch])

    if (!reviews) return null;

    return (
        <>
            <h1>My Reviews</h1>
            <main id="reviews_container">
                {reviews.map(({ id, created_at, rating, review, user }) => {
                    return <div className="review_cart" key={id}>
                        <div style={{ display: "none" }}>{user.username}</div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Rating: {rating}</span>
                            <span>Date: {created_at}</span>
                        </div>
                        <div>Message: {review}</div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <OpenModalButton
                                className="primary"
                                buttonText="Update"
                                modalComponent={<UpdateForm
                                    id={id}
                                    originalRating={rating}
                                    originalReview={review} />} />
                            <OpenModalButton
                                className="critical"
                                buttonText="Delete"
                                modalComponent={<DeleteConfirmation id={id} />}
                            />
                        </div>
                    </div>
                })}
            </main>
        </>
    )
}

function DeleteConfirmation({ id }) {
    const navigator = useNavigate()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const onYesHandler = () => {
        dispatch(deleteProductReview(id)).then(() => {
            navigator({ to: "/reviews" })
            closeModal()
        })
    }
    return (
        <div style={{ margin: "10px" }}>
            <h3>Delete Review?</h3>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <button className="critical" onClick={onYesHandler}>Yes</button>
                <button className="primary" onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

function UpdateForm({ id, originalRating, originalReview }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const [rating, setRating] = useState(originalRating)
    const [review, setReview] = useState(originalReview)

    const onUpdateHandler = () => {
        const updatedReview = {
            id,
            rating,
            review
        }

        dispatch(updateReviewAction(updatedReview)).then(() => {
            closeModal()
            navigator({ to: '/reviews' })
        })
    }

    return (
        <div style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }}>
            <h3 style={{ alignSelf: "center" }}>Update Review</h3>
            <label htmlFor="message"></label>
            <textarea
                id="message"
                value={review}
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
                onClick={onUpdateHandler}>Update</button>
            <button
                style={{ alignSelf: "center", cursor: "pointer" }}
                className="nutral"
                onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default MyReviewsPage