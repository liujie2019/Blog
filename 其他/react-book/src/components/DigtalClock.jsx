import React, { Component, Fragment } from 'react';

export default class DigitalClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { date } = this.state;
        return (
            <Fragment>
                <h1>{date.toLocaleTimeString()}</h1>
            </Fragment>
        );
    }
}
