import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import User from './User';
import Users from './Users';

const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         increment: () => {
//             dispatch(actions.increment());
//         },
//         decrement: () => {
//             dispatch(actions.decrement());
//         }
//     };
// }

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
}

class App extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        increment: PropTypes.func,
        decrement: PropTypes.func,
        incrementAsync: PropTypes.func
    }
    render() {
        const { increment, decrement, incrementAsync, counter } = this.props;
        return (
            <Fragment>
                <div className="container">
                    <h1 className="jumbotron-heading text-center">{ counter }</h1>
                    <p className="text-center">
                    <button onClick={() => increment()} className="btn btn-primary mr-2">Increase</button>
                    <button onClick={() => incrementAsync()} className="btn btn-primary mr-2">延迟2秒加1</button>
                    <button onClick={() => decrement()} className="btn btn-danger my-2">Decrease</button>
                    </p>
                </div>
                <User />
                <Users />
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
