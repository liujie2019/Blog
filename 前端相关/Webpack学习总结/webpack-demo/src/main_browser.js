import React from 'react';
import {render} from 'react-dom';
import {AppComponent} from  './components/AppComponent';
// 将根组件渲染到DOM树上
render(
    <AppComponent />,
    document.getElementById('root')
);