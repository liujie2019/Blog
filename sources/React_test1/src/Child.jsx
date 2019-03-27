import React from 'react';
import SubChild from './SubChild';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.cbFn('我是子组件1传来的信息');
    }

    componentDidUpdate() {
        console.log('子组件1更新');
    }

    render() {
        return (
            <div style={{backgroundColor: "yellow"}}>
                我是子组件1
                <button
                    onClick={() => this.handleClick()}
                >
                    点击我进行通信吧
                </button>
                <SubChild />
            </div>
        )
    }
}