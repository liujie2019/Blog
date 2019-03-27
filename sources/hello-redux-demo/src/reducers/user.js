import * as Types from '../constants';

const initialState = {
    isFetching: false,
    error: null,
    user: {}
};

const user = (state = initialState, action = {}) => {
    switch(action.type) {
        case Types.FETCH_USER_SUCCESS:
            return {
                isFetching: false,
                error: null,
                user: action.user
            };
        case Types.FETCH_USER_REQUEST:
            return {
                isFetching: true,
                error: null,
                user: {}
            };
        case Types.FETCH_USER_FAILURE:
            return {
                isFetching: false,
                error: action.error,
                user: {}
            };
        default:
            return state;
    }
};

export default user;