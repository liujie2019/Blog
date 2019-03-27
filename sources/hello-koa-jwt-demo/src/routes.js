import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import UserInfo from './components/UserInfo';
import Home from './components/user/home.js';
import Info from './components/user/Info';
import Life from './components/user/Life.js';
import Work from './components/user/Work.js';


export default (
    <div>
        <Switch>
            <Route exact path="/" component={ App } />
            <Route path="/login" component={ LoginPage } />
            <Route path="/signup" component={ SignupPage } />
            <Route path="/userInfo" component={ UserInfo } />
            <Home>
                <Route path='/home/info' component={ Info }/>
                <Route path='/home/work' component={ Work }/>
                <Route path='/home/life' component={ Life }/>
            </Home>
        </Switch>
    </div>
);