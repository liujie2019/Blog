import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import {INCREMENT, DECREMENT} from './actions';
import * as serviceWorker from './serviceWorker';

// 通过reducer创建一个store，每当在store上dispatch一个action的时候，store内的数据就会相应地发生变化
const store = createStore(rootReducer);
console.log(store.getState()); // counter: {count: 0}

store.subscribe(() => {
    console.log(store.getState());
});
store.dispatch(INCREMENT); // counter: {count: 1}
store.dispatch(INCREMENT); // counter: {count: 2}
store.dispatch(INCREMENT); // counter: {count: 3}
store.dispatch(DECREMENT); // counter: {count: 2}

// Provider内的任何一个组件，比如这里的App
// 如果需要使用store中的数据，就必须使用connect方法对该组件进行包装
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
