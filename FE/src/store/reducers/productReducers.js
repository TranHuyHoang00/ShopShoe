import actionTypes from '../actions/actionTypes';

const initialState = {
    productId: '',
    check: {},
    data_product: [],
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTER_PRODUCT:
            return {
                ...state,
                check: action.data
            }
        case actionTypes.GET_DATA_PRODUCT:
            return {
                ...state,
                data_product: action.data
            }
        case actionTypes.GET_PRODUCT_ID:
            return {
                ...state,
                productId: action.id
            }
        default:
            return state;
    }
}

export default productReducers;