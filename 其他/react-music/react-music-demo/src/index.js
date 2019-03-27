import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import { AppContainer } from 'react-hot-loader';
import Counter from './components/Counter';
import counter from './reducers/index';

/*
把应用包裹在 <AppContainer>,
当发生更新,所有<AppContainer>的children会reloaded
*/
const store = createStore(counter);

const render = () => {
    ReactDom.render(
            <Counter 
                value={store.getState()}
                //点击相应的按钮触发对应的action，调用相应的reducer返回对应的state
                onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                onDecrement={() => store.dispatch({type: 'DECREMENT'})}
            />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);

// if (module.hot) {
//     module.hot.accept('./components/Counter', () => {
//         const NewCounter = require('./components/Counter').default;
//         render(NewCounter);
//     });
// }