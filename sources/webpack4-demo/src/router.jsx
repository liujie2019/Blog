import React, { Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Life from './componnents/Life';
import Study from './componnents/Study';
import Home from './componnents/Home';
import User from './User';

const routes = (
    <BrowserRouter>
        <Fragment>
            <Link to="/">首页 | </Link>
            <Link to="/Life">生活 | </Link>
            <Link to="/Study">学习 | </Link>
            <Link to="/User">用户</Link>
            <Route exact path="/" component={Home} />
            <Route path="/Life" component={Life} />
            <Route path="/Study" component={Study} />
            <Route path="/User" component={User} />
        </Fragment>
    </BrowserRouter>
);

export default routes;