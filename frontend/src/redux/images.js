const SET_IMAGES = 'images/SET_IMAGES';
const ADD_IMAGE = 'images/ADD_IMAGE';
const REMOVE_IMAGE = 'images/REMOVE_IMAGE';


//! Action creators
const setImages = (productId, images) => ({
    type: SET_IMAGES,
    payload: { productId, images }
});

const addImage = (productId, image) => ({
    type: ADD_IMAGE,
    payload: { productId, image }
});

const removeImage = (productId, image) => ({
    type: REMOVE_IMAGE,
    payload: { productId, image }
});

//! Thunk actions
export const fetchProductImages = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/images`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch images');
    }

    const data = await response.json()
    dispatch(setProductDetails(data.product));
    return response;
}
