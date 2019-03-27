import './style/index.css';
import React, {Fragment} from 'react';
import { render } from 'react-dom';
import Hello from 'components/Hello';

const renders = (Component) => {
    render(
        <Fragment>
            <h1>我是首页111222</h1>
            {Component}
        </Fragment>,
        document.getElementById('root')
    );
}

renders(<Hello />);

if (module.hot) {
    module.hot.accept(['./components/Hello'], () => {
        renders(<Hello />);
    });
}