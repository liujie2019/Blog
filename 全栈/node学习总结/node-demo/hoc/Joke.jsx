import React, { Component } from 'react';

class Joke extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      jokes: null
    };
  }

  componentDidMount() {
    fetch('http://api.icndb.com/jokes/random/3')
      .then(res => res.json())
      .then(jokes => {
        this.setState({
          loading: false,
          jokes: jokes
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
        <div>
          {
            this.state.jokes.value.map(joke => (
              <p key={ joke.id }>{ joke.joke }</p>
            ))
          }
        </div>
      )
    }
  }
}

export default Joke;