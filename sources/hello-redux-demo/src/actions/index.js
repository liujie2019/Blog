import * as Types from '../constants';
export const increment = () => {
    return {
        type: Types.INCREMENT
    };
}

export const incrementAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 2000);
    }
}

export const decrement = () => {
    return {
        type: Types.DECREMENT
    };
}