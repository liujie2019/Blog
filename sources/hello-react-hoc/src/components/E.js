import React, { Component } from 'react';
import D from './D';

class E extends Component {
    componentWillMount() {
        alert('我是原始的生命周期');
    }
  render() {
    return (
      <div>
        我是Div
      </div>
    )
  }
}

export default D(E);
