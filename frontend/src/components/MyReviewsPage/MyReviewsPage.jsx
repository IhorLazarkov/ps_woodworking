import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentReviews } from "../../redux/reviews"
import './MyReviews.css'

function MyReviewsPage() {

    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.reviews)

    useEffect(() => {
        dispatch(fetchCurrentReviews()).then(() => {

        })
    }, [dispatch])

    if (!reviews) return null;

    return (
        <>
            <h1>My Reviews</h1>
            <main id="reviews_container">
                {reviews.map(({ created_at, rating, review, user }) => {
                    return <div className="review_cart">
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
                            <button className="critical">delete</button>
                        </div>
                    </div>
                })}
            </main>
        </>
    )
}

export default MyReviewsPage