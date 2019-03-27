import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  // 最好的写法
  handleChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>{ this.state.name }</p>
        <input type="text" onChange={ this.handleChange } />
      </div>
    );
  }
}

export default App;