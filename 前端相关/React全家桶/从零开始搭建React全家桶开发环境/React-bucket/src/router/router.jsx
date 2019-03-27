import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Study from '../components/Study';
import User from '../components/User';
import Match from '../components/Match';

const routes = (
       <Router>
            <div>
                <Link to="/">首页 | </Link>
                <Link to="/Life">生活 | </Link>
                <Link to="/Study">学习 | </Link>
                <Link to="/User">个人信息</Link>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Life" render={() => <Redirect to="/User" />} />
                    <Route path="/Study" component={Study} />
                    <Route path="/User" component={User} />
                    <Route path="/:id" component={Match} />
                </Switch>
            </div>
       </Router>
);

export default routes;