import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }
    incrementIfOdd() {
        if(this.props.value % 2 !== 0) {
            this.props.onIncrement();
        }
    }
    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000);
    }

    render() {
        const {value, onIncrement, onDecrement} = this.props;
        return (
            <div>
                点击了: {value}次{' '}
                <button onClick={onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={this.incrementIfOdd.bind(this)}>
                    奇数加
                </button>
                {' '}
                <button onClick={this.incrementAsync.bind(this)}>
                    异步加
                </button>
            </div>
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

export default Counter;