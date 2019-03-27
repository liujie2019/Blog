import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

const render = Component => {
  ReactDom.render(
    <AppContainer>
      <Component
        store={ store }
      />
    </AppContainer>,
    document.getElementById('root')
  );
}
render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(RootContainer);
  });
}
