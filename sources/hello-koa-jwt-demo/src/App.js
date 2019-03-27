import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="jumbotron">
        <NavigationBar />
        <h1>欢迎访问</h1>
      </div>
    );
  }
}

export default App;
