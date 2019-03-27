import React from 'react';
import Child2_1 from './Child2_1';

export default class Child2 extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.cbFn('我是子组件传来的信息');
    }

    componentDidUpdate() {
        console.log('子组件2更新');
    }

    render() {
        return (
            <div style={{backgroundColor: "red"}}>
                {this.props.title}
                <p>
                    我是子组件2
                </p>
                <Child2_1 />
            </div>
        )
    }
}