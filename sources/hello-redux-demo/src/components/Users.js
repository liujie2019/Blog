import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get_user } from '../actions/users';

class User extends Component {

  fetchUser() {
    const { get_user } = this.props;
    get_user();
  }

  render() {
    const { error, isFetching, user } = this.props.user;

    let data;

    if (error) {
      data = error;
    } else if (isFetching) {
      data = "Loading...";
    } else {
      data = user.email;
    }

    return (
      <div>
        <h1 className="jumbotron-heading text-center">{data}</h1>
        <p className="text-center">
          <button onClick={() => this.fetchUser()} className="btn btn-success mr-2">GET RANDOM USER</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  };
};

export default connect(mapStateToProps, {get_user})(User);