import React, { Component } from 'react'
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';

// Switch的作用就是匹配一个组件
class Switch extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Consumer>
                {
                    state => {
                        let pathname = state.location.pathname;
                        let children = this.props.children;
                        for (var i = 0; i < children.length; i++) {
                            let child = children[i];
                            // Redirect没有path属性，这里需要兼容处理
                            let path = child.props.path || '';
                            let reg = pathToRegExp(path, [], {end: false});
                            // Switch匹配成功了
                            if (reg.test(pathname)) {
                                return child; // 把匹配到的组件返回即可
                            }
                        }
                        // 都没有匹配则返回null
                        return null;
                    }
                }
            </Consumer>
        )
    }
}

export default Switch
