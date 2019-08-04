import React, { Component } from 'react'
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
class Route extends Component {
    render() {
        return (
            <Consumer>
                {
                    state => {
                        {/* console.log(state); */}
                        // path是route中传递的属性
                        // 设置extract的目的为精确严格匹配
                        let {path, component: Component, exact = false} = this.props;
                        // pathname是location中的
                        let pathname = state.location.pathname;
                        // 路由匹配则显示对应的组件
                        // 根据path实现一个正则，通过正则来匹配
                        // 正则实现/home/xxx/xxx 等情况的匹配
                        let keys = [];
                        let reg = pathToRegExp(path, keys, {end: exact});
                        keys = keys.map(item => item.name);  // [id, name]
                        let result = pathname.match(reg);
                        let [url, ...values] = result || []; // [1, 2]
                        let props = {
                            location: state.location,
                            history: state.history,
                            match: {
                                params: keys.reduce((obj, current, index) => {
                                    obj[current] = values[index];
                                    return obj;
                                }, {})
                            }
                        };
                        if (result) {
                            return <Component {...props}></Component>;
                        }
                        return null;
                    }
                }
            </Consumer>
        )
    }
}

export default Route
