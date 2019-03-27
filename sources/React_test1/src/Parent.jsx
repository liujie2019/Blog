import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child from './Child';
import Child2 from './Child2';

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '我是父组件传来的消息'
        };
    }

    getChildContext() {
        return {
            color: "red"
        };
    }

    cbFn(msg) {
        this.setState({
            msg: msg
        })
    }

    componentDidUpdate() {
        console.log('父组件更新');
    }

    render() {
        return (
            <div>
                我是父组件
                <Child 
                    cbFn={(msg) => this.cbFn(msg)}
                />
                <Child2
                    title={this.state.msg}
                />
            </div>
        )
    }
}
Parent.childContextTypes = {
    color: PropTypes.string
};