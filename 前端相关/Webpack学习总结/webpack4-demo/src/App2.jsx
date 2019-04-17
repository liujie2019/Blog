import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style/Button.css';

console.log(styles);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
    }

    handleClick() {
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        const { disabled } = this.state;
        const cx = classNames({
            [styles.normal]: !disabled,
            [styles.disabled]: disabled
        });
        return (
            <React.Fragment>
                test111
                <a
                    className={cx}
                    onClick={() => this.handleClick()}
                >
                    Confirm
                </a>
            </React.Fragment>
        );
    }
}