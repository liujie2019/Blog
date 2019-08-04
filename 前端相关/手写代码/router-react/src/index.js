import React, { Component } from 'react'
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link, Redirect, Switch} from './react-router-dom';
import Home from './Home';
import Profile from './Profile';
import User from './User';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Link to="/home">首页</Link>
                        <Link to="/profile">个人中心</Link>
                        <Link to="/user">用户</Link>
                    </div>
                    <div>
                        {/* Switch是匹配到一个路由后就不再向下匹配了 */}
                        <Switch>
                            {/* 设置extract的目的为精确严格匹配 */}
                            {/* <Route path="/home/123" component={Home}></Route> */}
                            <Route path="/home" exact={true} component={Home}></Route>
                            <Route path="/profile" component={Profile}></Route>
                            <Route path="/user" component={User}></Route>
                            {/* 匹配不到则重定向到首页 */}
                            <Redirect to="/home"></Redirect>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
// window.root 等同于document.getElementById('root')
render(<App />, window.root);
