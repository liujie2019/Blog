import React from 'react';

export default class Child2_1 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log('子组件2_1更新');
    }

    render() {
        return (
            <div>
                我是子组件2_1
            </div>
        )
    }
}