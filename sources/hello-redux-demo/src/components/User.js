import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/user';

class User extends Component {

  fetchUser() {
    const { fetch_user_request, fetch_user, fetch_user_failure } = this.props;
    fetch_user_request();
    axios.get("https://randomuser.me/api/")
        .then(res => {
            fetch_user(res.data.results[0]);
        })
        .catch(error => {
            fetch_user_failure(error.response.data);
        })
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
    user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);