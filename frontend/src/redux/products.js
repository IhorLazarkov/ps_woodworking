const SET_PRODUCTS = 'products/SET_PRODUCTS';
const ADD_PRODUCT = 'products/ADD_PRODUCT';
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT';
const SET_PRODUCT_DETAILS = 'products/SET_PRODUCT_DETAILS';


//! Action Creators
//~ all products
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products
});

//~ product details
const setProductDetails = (product) => ({
    type: SET_PRODUCT_DETAILS,
    payload: product
});

//~ add product
const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product
});

//~ delete product
const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: productId
});

//! thunk actions
//~ fetch all
export const fetchProducts = () => async (dispatch) => {
    const response = await fetch('api/products');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch products');
    }

    const data = await response.json()
    dispatch(setProducts(data.products))
}

//~ fetch single
export const fetchProductDetails = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch product details');
    }

    const data = await response.json()
    dispatch(setProductDetails(data.product));
    return response;
}

//~ add new product
export const createProduct = (productData) => async (dispatch) => {
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create product');
    }

    const data = await response.json();
    dispatch(addProduct(data.product)); // Assuming your API returns the newly created product
    return data;
};

//~ delete a product
export const deleteProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete product');
    }

    dispatch(removeProduct(productId));
    return response; // Or sucess message
};

//~ update an existing product (optional, but often needed)
export const updateProduct = (productId, productData) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT', // Or PATCH, depending on your API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update product');
    }

    const data = await response.json();
    dispatch(setProduct(data.product)); // Assuming your API returns the updated product
    return data;
};

//! reducer
const initialState = {
    products: [],
    productDetails: {}
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.payload };
        case SET_PRODUCT_DETAILS:
            return{ ...state, productDetails: action.payload}
        case ADD_PRODUCT:
            return { ...state, products: [...state.products, action.payload] };
        case REMOVE_PRODUCT:
            return { ...state, products: state.products.filter(product => product.id !== action.payload) };
        default:
            return state;
    }
};

export default productsReducer;
