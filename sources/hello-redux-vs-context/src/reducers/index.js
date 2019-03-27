import {combineReducers} from 'redux';
import {foodReducer} from './foodList';

const rootReducers = combineReducers({
    foodList: foodReducer
});

export default rootReducers;