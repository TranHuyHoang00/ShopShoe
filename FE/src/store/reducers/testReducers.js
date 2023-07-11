import actionTypes from '../actions/actionTypes';

const initialState = {
    data: {},
    test_data: {},
}

const testReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEST_START:
            return {
                ...state,
            }
        case actionTypes.TEST_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.TEST_DATA:
            return {
                ...state,
            }
        case actionTypes.TEST_SUCCESS_DATA:
            return {
                ...state,
                test_data: action.data
            }
        case actionTypes.TEST_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default testReducers;