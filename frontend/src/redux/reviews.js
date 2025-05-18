const SET_REVIEWS = 'reviews/SET_REVIEWS';
const GET_CURRENT_REVIEWS = 'reviews/GET_CURRENT_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';


//! Action creators
const setReviews = (reviews) => ({
    type: SET_REVIEWS,
    payload: reviews
})

const getCurrentReviews = (reviews) => ({
    type: GET_CURRENT_REVIEWS,
    payload: reviews
})

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    payload: review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})


//! Thunk Actions
export const fetchProductReviews = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`)
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch reviews');
    }

    const data = await response.json();
    dispatch(setReviews(data.reviews));
    return data.reviews;
}

export const fetchCurrentReviews = () => async (dispatch) => {
    const response = await fetch('/api/sessions/reviews')
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to get reviews")
    }

    const data = await response.json()
    dispatch(getCurrentReviews(data.reviews))
    return response
}

export const createProductReview = (productId, review) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create review')
    }

    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview
};

export const updateReviewAction = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete a review")
    }

    await response.json()
    dispatch(updateReview(review))
    return review
}

export const deleteProductReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete review')
    }

    const data = await response.json()
    dispatch(removeReview(reviewId));
    return data
}

//!Reducer
const initialState = []

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS: {
            const reviews = [...action.payload]
            return [...reviews];
        }
        case GET_CURRENT_REVIEWS:
            const currentReviews = [...action.payload]
            return [...currentReviews]
        case UPDATE_REVIEW:
            const review = action.payload
            const updatesReviews = state.map(r => {
                if (r.id == review.id) {
                    r.review = review.review
                    r.rating = review.rating
                    return r
                }
                return r
            })
            return [...updatesReviews]
        case ADD_REVIEW:
            return [...state, action.payload];
        case REMOVE_REVIEW:
            state = [...state.filter(r => r.id != action.payload)]
            return [...state];
        default:
            return state;
    }
};

export default reviewsReducer;
