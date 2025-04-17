const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';


//! Action creators
const setReviews = (productId, reviews) => ({
    type: SET_REVIEWS,
    payload: {productId, reviews}
})

const addReview = (productId, review) => ({
    type: ADD_REVIEW,
    payload: {productId, review}
})

const removeReview = (productId, review) => ({
    type: REMOVE_REVIEW,
    payload: {productId, review}
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

export const deleteProductReview = (productId, reviewId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete review')
    }

    dispatch(removeReview(productId, reviewId));
    return response
}

//!Reducer
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...state, [action.payload.productId]: action.payload.reviews };
        case ADD_REVIEW:
            return { ...state,
                [action.payload.productId]: [
                    ...(state[action.payload.productId] || []), // handle cases where no reviews
                    action.payload.review,
                ],
            };
        case REMOVE_REVIEW:
            return {
                ...state,
                [action.payload.productId]: (state[action.payload.productId] || []).filter(
                    (review) => review.id !== action.payload.reviewId
                ),
            };
        default:
            return state;
    }
};

export default reviewsReducer;
