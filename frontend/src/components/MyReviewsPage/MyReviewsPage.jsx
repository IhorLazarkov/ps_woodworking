import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductReview, fetchCurrentReviews } from "../../redux/reviews"
import './MyReviews.css'
import OpenModalButton from "../OpenModalButton"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"

function MyReviewsPage() {

    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.reviews)

    useEffect(() => {
        dispatch(fetchCurrentReviews()).then(() => {})
    }, [dispatch])

    if (!reviews) return null;

    return (
        <>
            <h1>My Reviews</h1>
            <main id="reviews_container">
                {reviews.map(({ id, created_at, rating, review, user }) => {
                    return <div className="review_cart" key={id}>
                        <div style={{ display: "none" }}>{user?.username}</div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Rating: {rating}</span>
                            <span>Date: {created_at}</span>
                        </div>
                        <div>Message: {review}</div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <button className="primary">update</button>
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

export default MyReviewsPage