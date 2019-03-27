import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: ''
        };
    }
    static propTypes = {
        login: PropTypes.func.isRequired
    };
    static contextTypes = {
        router: PropTypes.object
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { identifier, password } = this.state;
        if (identifier === '' || password === '') {
            return false;
        }
        this.props.login(this.state).then(() => {
            this.context.router.history.push('/home/info');
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        const { identifier, password } = this.state;
        return (
            <form onSubmit={ this.onSubmit }>
                <h1>登录</h1>
                <div className="form-group">
                    <label className="control-label">用户名 / 邮箱</label>
                    <input
                        value={ identifier }
                        onChange={ this.onChange }
                        type="text"
                        name="identifier"
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
                    <button className="btn btn-primary btn-lg">
                        登录
                    </button>
                </div>
            </form>
        );
    }
}

export default connect(null, { login })(LoginFrom);
