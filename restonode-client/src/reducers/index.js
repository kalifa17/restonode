import { combineReducers } from 'redux';
import orders from './orderReducer';

export default combineReducers({
    orders: orders
});