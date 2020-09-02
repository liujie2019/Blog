import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// JSX

let color = 'bgRed';
let el = (
    <div className={color}>
        红色的背景颜色
    </div>
);

ReactDOM.render(
    el,
    document.querySelector('#root')
);