import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';
import users from './Users';

const rootReducer = combineReducers({
    counter,
    user,
    users
});

export default rootReducer;