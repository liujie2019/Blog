import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';


class Signup extends Component {
    static propTypes = {
        userSignupRequest: PropTypes.func.isRequired
    };
    render() {
        const { userSignupRequest } = this.props;
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                <SignupForm
                    userSignupRequest = {userSignupRequest}
                />
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default connect(null, { userSignupRequest })(Signup);
