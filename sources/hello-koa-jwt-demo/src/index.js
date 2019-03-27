import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
// 引入路由
import routes from './routes';
import './App.css';
// 导航
import rootReducers from './reducers';
import { setCurrentUser } from './actions/authActions';


// axios 请求拦截器处理请求数据
// config 为请求的一些配置 例如：请求头/请求时间/Token
// 可以根据自己的项目需求个性化配置，参考axios的中文说明手册， 自己多动手
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        delete config.headers.common['Authorization'];
    }
    // 设置请求时间(10秒)
    config.timeout = 10 * 1000;
    return config;
}, error => {
    return Promise.reject(error);
});

const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);

// 如果登录成功了，则根据token获取用户信息
if (localStorage.jwtToken) {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={ store }>
        <Router routes={ routes }>
            { routes }
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
