import React from 'react';
import ReactDOMServer from 'react-dom/server';
import AppComponent from  './components/AppComponent.jsx';

export function render() {
    // 将根组件渲染成HTML字符串
    return ReactDOMServer.renderToString(<AppComponent />);
}