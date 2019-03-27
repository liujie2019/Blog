import React, { Component, Fragment } from 'react';
import { combineReducers, createStore } from 'redux';

const initialState = {
    cash: 200
}
const reducer = (state = initialState, action) => {
const {type, payload} = action;
switch (type) {
    case 'INCREMENT':
        return Object.assign({}, state, {
            cash: state.cash + payload
        });
    case 'DECREMENT':
        return Object.assign({}, state, {
            cash: state.cash - payload
        });
    default:
        return state;
}
}

const reducers = combineReducers({
    treasury: reducer
});

// 创建小金库
const store = createStore(reducers);
console.log(store.getState());

// 当小金库的现金发生变化时，打印当前的金额
store.subscribe(() => {
    console.log(store.getState());
    console.log(`余额：${store.getState().treasury.cash}`);
});

// 小明爸爸发了工资300块上交
store.dispatch({
    type: 'INCREMENT',
    payload: 300
});
// 小明拿着水电费单交100块水电费
store.dispatch({
    type: 'DECREMENT',
    payload: 100
});
export default store;