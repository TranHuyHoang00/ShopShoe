import { combineReducers } from 'redux';
import testReducers from './testReducers';
import productReducers from './productReducers';
export default combineReducers({
    test: testReducers,
    product: productReducers,
})