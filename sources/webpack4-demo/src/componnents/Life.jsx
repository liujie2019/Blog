import React, { Fragment } from 'react';

export default class Life extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount() {
        this.myRef.current.focus();
        this.myRef.current.value = 'test';
        this.myRef2.focus();
    }
    render() {
        return (
            <Fragment>
                Life
                <input ref={this.myRef} />
                <input ref={(ele) => {
                    this.myRef2 = ele;
                }} />
            </Fragment>
        );
    }
}