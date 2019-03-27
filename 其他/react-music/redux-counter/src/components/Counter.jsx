import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { increment, incrementIfOdd, decrement, incrementAysnc, counter } = this.props;
        return (
            <p>
                点击了: {counter} 次
                {' '}
                <button onClick={increment}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={incrementAysnc}>Increment Aysnc</button>
            </p>
        );
    }
}

Counter.propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAysnc: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
}

export default Counter;