import actionTypes from './actionTypes';

export const test_start = () => {
    return async (dispatch, getState) => {
        try {
            // let data = await test();
            let data = { id: '1', name: 'hoang' };
            if (data) {
                dispatch(test_success(data));
            } else {
                dispatch(test_failed(data));
            }
        } catch (e) {
            dispatch(test_failed());
            console.log('lỗi', e);
        }
    }
}
export const test_success = (data) => ({
    type: actionTypes.TEST_SUCCESS,
    data: data
})
export const test_data = () => {
    return async (dispatch, getState) => {
        try {
            console.log('ok');
            let data = { id: '1', name: 'hoang' }
            if (data) {
                dispatch(test_success_data(data));
            } else {
                dispatch(test_failed(data));
            }
        } catch (e) {
            dispatch(test_failed());
            console.log('lỗi', e);
        }
    }
}
export const test_success_data = (data) => ({
    type: actionTypes.TEST_SUCCESS_DATA,
    data: data
})
export const test_failed = (data) => ({
    type: actionTypes.TEST_FAILED,
    data: data
})
