import React, { Component } from 'react'

class UserAdd extends Component {
    constructor() {
        super();
        // 16.3新提供
        this.text = React.createRef();
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.text.current.value);
        console.log(this.props);
        // 添加完跳转到列表页面
        this.props.history.push('/user/list');
    }
    render() {
        return (
            <div>
                <h2>添加用户</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={this.text} />
                    <button type="submit">提交</button>
                </form>
            </div>
        )
    }
}

export default UserAdd
