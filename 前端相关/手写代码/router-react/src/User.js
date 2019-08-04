import React, { Component } from 'react'
import {Route, Link} from './react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';

export class User extends Component {
    render() {
        return (
            <div>
                我是用户中心页面
                <div>
                    <li>
                        <Link to="/user/add">添加用户</Link>
                    </li>
                    <li>
                        <Link to="/user/list">用户列表</Link>
                    </li>
                </div>
                <div>
                    {/* 二级路由实现 */}
                    <Route path="/user/add" component={UserAdd}></Route>
                    <Route path="/user/list" component={UserList}></Route>
                    <Route path="/user/detail/:id" component={UserDetail}></Route>
                </div>
            </div>
        )
    }
}

export default User
