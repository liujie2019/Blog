import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// JSX

// let divStyle = {
//     background: 'red',
//     borderBottom: '3px solid blue'
// };
// let el = (
//     <div style={divStyle}>
//         红色的背景颜色
//     </div>
// );

let classStr = ['wh', 'redBg'].join(' ');
let el2 = (
    <div className={classStr}>
        红色的背景颜色
    </div>
);

ReactDOM.render(
    el2,
    document.querySelector('#root')
);