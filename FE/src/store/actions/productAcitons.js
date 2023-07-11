import actionTypes from './actionTypes';

export const filter_product = (data) => ({
    type: actionTypes.FILTER_PRODUCT,
    data: data
})
export const get_data_product = (data) => ({
    type: actionTypes.GET_DATA_PRODUCT,
    data: data
})
export const get_product_id = (id) => ({
    type: actionTypes.GET_PRODUCT_ID,
    id: id
})