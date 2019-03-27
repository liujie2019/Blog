import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';

export default class User extends Component {
    render() {
        return (
            <div>
                个人信息
                <Prompt when message="确定要离开个人信息页面吗?" />
            </div>
        );
    }
}
