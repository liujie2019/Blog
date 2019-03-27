// 错误捕获
import React, { Component } from 'react';

//纯组件
const Profile = ({ user }) => (<div>name: {user.name}</div>);

// 捕获错误组件
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    // 捕获错误
    componentDidCatch(err, info) {
        this.setState({
            hasError: true
        });
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <div>出错了</div>
        }
        return this.props.children;
    }

}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'lisi'
            }
        };
    }

    render() {
        const { hasError, user } = this.state;
        return (
            <div>
                <ErrorBoundary>
                    <Profile user={user} />
                </ErrorBoundary>
            </div>
        );
    }
}