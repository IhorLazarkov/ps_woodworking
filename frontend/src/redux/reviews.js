const SET_REVIEWS = 'reviews/SET_REVIEWS';
const GET_CURRENT_REVIEWS = 'reviews/GET_CURRENT_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';


//! Action creators
const setReviews = (productId, reviews) => ({
    type: SET_REVIEWS,
    payload: { productId, reviews }
})

const getCurrentReviews = (reviews) => ({
    type: GET_CURRENT_REVIEWS,
    payload: reviews
})

const addReview = (productId, review) => ({
    type: ADD_REVIEW,
    payload: { productId, review }
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
    dispatch(setReviews(productId, data.reviews));
    return data;
}

export const fetchCurrentReviews = () => async (dispatch) => {
    const response = await fetch('/api/sessions/reviews')
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to get reviews")
    }

    const data = await response.json()
    dispatch(getCurrentReviews(data))
    return response
}

export const createProductReview = (productId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/prducts/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create review')
    }

    const data = await response.json();
    dispatch(addReview(productId, data.review));
    return data
};

export const updateReviewAction = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`,
        {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
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

    await response.json()
    dispatch(removeReview(reviewId));
    return data
}

//!Reducer
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, [action.payload.productId]: action.payload.reviews };
        case GET_CURRENT_REVIEWS:
            const currentReviews = action.payload
            return { ...currentReviews }
        case UPDATE_REVIEW:
            const review = action.payload
            const updatesReviews = state.reviews.map(r => {
                if (r.id == review.id)
                    return review
                return r
            })
            return { reviews: [...updatesReviews] }

        case ADD_REVIEW:
            return {
                ...state,
                [action.payload.productId]: [
                    ...(state[action.payload.productId] || []), // handle cases where no reviews
                    action.payload.review,
                ],
            };
        case REMOVE_REVIEW:
            const reviews = [...state.reviews.filter(r => r.id != action.payload)]
            return { reviews: [...reviews] };

        default:
            return state;
    }
};

export default reviewsReducer;
