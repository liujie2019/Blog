import {INCREMENT, DECREMENT} from '../constants/ActionTypes';

//ActionCreater
export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState();
        if(counter % 2 === 0) {
            return;
        }
        dispatch(increment());
    }
}

export function incrementAysnc() {
    return dispatch => {
      setTimeout(() => {
        dispatch(increment());
      }, 2000);
    };
  }