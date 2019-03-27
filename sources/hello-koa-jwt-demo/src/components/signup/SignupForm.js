import React, { Component } from 'react';
// 静态类型检查
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }
    }
    static contextTypes = {
        router: PropTypes.object
    }
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(() => {
            this.context.router.history.push('/');
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <form onSubmit={ this.onSubmit }>
                <h1>欢迎注册</h1>
                <div className="form-group">
                <label className="control-label">用户名</label>
                <input
                    value={ username }
                    onChange={ this.onChange }
                    type="text"
                    name="username"
                    className='form-control'
                />
                </div>
                <div className="form-group">
                    <label className="control-label">邮箱</label>
                    <input
                        value={ email }
                        onChange={ this.onChange }
                        type="email"
                        name="email"
                        className='form-control'
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">密码</label>
                    <input
                        value={ password }
                        onChange={ this.onChange }
                        type="password"
                        name="password"
                        className='form-control'
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">确认密码</label>
                    <input
                        value={ passwordConfirmation }
                        onChange={ this.onChange }
                        type="password"
                        name="passwordConfirmation"
                        className='form-control'
                    />
                </div>
                <div className="form-group">
                <button className="btn btn-primary btn-lg">
                    注册
                </button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
