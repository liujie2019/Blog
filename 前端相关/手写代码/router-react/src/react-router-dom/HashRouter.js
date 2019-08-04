import React, { Component } from 'react'
import {Provider} from './context';
class HashRouter extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                // slice(1)的目的是去除hash中的#
                pathname: window.location.hash.slice(1) || '/'
            }
        };
    }
    componentDidMount() {
        // 默认hash没有时跳转到/
        window.location.hash = window.location.hash || '/';
        // 监听hash值变化，重新设置状态
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/'
                }
            });
        });
    }
    render() {
        let value = {
            location: this.state.location,
            history: {
                push(to) {
                    window.location.hash = to;
                }
            }
        };
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

export default HashRouter
