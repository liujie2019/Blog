import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Test extends Component {
    static defaultProps = {
        testStr: '我是默认值'
    }
    render() {
        return (
            <Fragment>
                {this.props.testStr}
            </Fragment>
        );
    }
}

Test.propTypes = {
    testStr: PropTypes.string
};