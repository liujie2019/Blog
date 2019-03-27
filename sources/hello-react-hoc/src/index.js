import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// serviceWorker主要用于生产环境中，缓存资源到本地，提升应用的访问速度
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
