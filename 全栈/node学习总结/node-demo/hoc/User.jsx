import React, { Component } from 'react';

class User extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(user => {
        this.setState({
          loading: false,
          user: user
        });
      })
  }

  render() {
    if(this.state.loading) {
      return (
        <div>loading</div>
      )
    } else {
      return (
        <h1>{this.state.user.results[0].email}</h1>
      )
    }
  }
}

export default User;