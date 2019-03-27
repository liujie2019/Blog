import React, { Component } from 'react';
import A from './A';

class C extends Component {
    getName() {
        return '我是C组件';
    }
    render() {
        return (
        <div>
            我是C组件
            <input type="text" {...this.props} />
        </div>
        );
    }
}
export default A(C);