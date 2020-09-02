import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { func } from 'prop-types';

// let app = <React.StrictMode>
// <App />
// </React.StrictMode>;
// let el = <h1>hello world</h1>;
// ReactDOM.render(
//   el,
//   document.getElementById('root')
// );

// 实现页面时钟显示

// function clock() {
//     let time = new Date().toLocaleTimeString();
//     let el = <h1>现在的时间是{time}</h1>;
//     let root = document.querySelector('#root');
//     ReactDOM.render(el, root);
// }

// setInterval(clock, 1000);

// 函数组件
function Clock(props) {
    return (
        <div>
            <h1>现在时间是{props.date.toLocaleTimeString()}</h1>
            <h2>这是函数式组件</h2>
        </div>
    );
}

function run() {
    let root = document.querySelector('#root');
    ReactDOM.render(<Clock date={new Date()}/>, root);
}

setInterval(run, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
