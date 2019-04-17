import React, { Component } from 'react';

class Person extends Component {
    render() {
        return (
            <div>
                {this.props.name + '--' + this.props.age + '--' + this.props.job}
            </div>
        );
    }
}

export default Person;