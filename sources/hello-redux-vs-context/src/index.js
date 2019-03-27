// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

// const store = createStore(rootReducer);

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './providers';
import Consumer from './consumer';
import App from './Context-App';

ReactDOM.render(
  <Provider>
    <Consumer>
      <App />
    </Consumer>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
