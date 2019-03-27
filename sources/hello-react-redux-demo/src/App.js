import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {INCREMENT, DECREMENT, actionCreators} from './actions';

class App extends Component {
  render() {
      const {counter, increment, decrement} = this.props;
        return (
        <div className="App">
            <label>计数：</label>
            <span>{counter.count}</span>
            <button onClick={increment}>加1</button>
            <button onClick={decrement}>减1</button>
        </div>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        increment: actionCreators.increment,
        decrement: actionCreators.decrement
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
