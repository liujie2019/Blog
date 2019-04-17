import React from 'react';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testVal: 'Homes'
        };
    }

    componentWillMount() {
        this.fnTest();
    }

    fnTest = async () => {
        await this.asyncFn();
    }

    asyncFn = async () => {
        setTimeout(() => {
            this.setState({
                testVal: 'Home async'
            });
        }, 2000);
    }

    render() {
        return (
            <div>
                {this.state.testVal}
            </div>
        );
    }
}