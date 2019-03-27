import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/CounterActions';

function mapStateToProps(state) {
    return { 
        counter: state.counter
    };
}

class CounterApp extends React.Component {
    render() {
        const {counter, dispatch} = this.props;
        // const ac = bindActionCreators(CounterActions, dispatch);
        // console.log(ac);
        return (
           <Counter 
                counter={counter}
                {...bindActionCreators(CounterActions, dispatch)} 
            />
        );
    }
}

export default connect(mapStateToProps)(CounterApp);