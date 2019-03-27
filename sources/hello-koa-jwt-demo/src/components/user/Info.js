import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { Card } from 'antd';
import { getUserInfo }  from '../../api/user';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }
    componentDidMount() {
        const data = jwtDecode(localStorage.getItem('jwtToken'));
        getUserInfo({name: data.name}).then(res => {
            this.setState({
                userInfo: res.data.data
            });
        });
    }
    render() {
        const { userInfo } = this.state;
        console.log(userInfo);
        return (
            <div>
                <h1>用户信息页面</h1>
                <Card
                    title="用户信息"
                    style={{ width: 300 }}
                >
                    <p>姓名：{userInfo.name}</p>
                    <p>邮箱：{userInfo.email}</p>
                </Card>
            </div>
        );
    }
}

export default Info;
