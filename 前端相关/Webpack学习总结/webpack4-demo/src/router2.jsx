import React, { Fragment } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Loading = () => <div>Loading</div>;
const Life = Loadable({
    loader: () => import('./componnents/Life'),
    loading: Loading,
    delay: 3000
});
const Study = Loadable({
    loader: () => import('./componnents/Study'),
    loading: Loading,
    delay: 3000
});
const Home = Loadable({
    loader: () => import('./componnents/Home'),
    loading: Loading
});

const routes = (
    <BrowserRouter>
        <Fragment>
            <Link to="/">首页 | </Link>
            <Link to="/Life">生活 | </Link>
            <Link to="/Study">学习</Link>
            <Route exact path="/" component={Home} />
            <Route path="/Life" component={Life} />
            <Route path="/Study" component={Study} />
        </Fragment>
    </BrowserRouter>
);

export default routes;