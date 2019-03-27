// 使用createPortal把组件渲染到当前组件树之外
// 基于createPortal可以实现蒙层组件
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 创建蒙层组件
class Overlay extends Component {
    constructor(props) {
        super(props);

        // 动态创建一个container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    // 页面卸载的时候，移除container
    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="overlay">
                <span className="overlay_close" onClick={this.props.onClose}>
                    &times;
                </span>
                {this.props.children}
            </div>,
            this.container
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overlayActive: true
        };
    }

    closeOverlay() {
        this.setState({
            overlayActive: false
        });
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                {
                    this.state.overlayActive &&
                    <Overlay onClose={() => this.closeOverlay()}/>
                }
            </div>
        );
    }
}

export default App;