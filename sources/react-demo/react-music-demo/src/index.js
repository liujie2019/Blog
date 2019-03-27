import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HelloReact from './components/Hello';

/*
把应用包裹在 <AppContainer>,
当发生更新,所有<AppContainer>的children会reloaded
*/
const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
}

render(HelloReact);

if (module.hot) {
    module.hot.accept('./components/Hello', () => {
        const NewHello = require('./components/Hello').default;
        render(NewHello);
    });
}