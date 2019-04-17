import React, { Fragment } from 'react';
import _ from 'lodash';

export default class Study extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                num: 0
            }
        };
    }
    lodashFn = (...args) => {
        // 创建一个lodash包装实例，包装value以启用显式链模式
        // console.log(_.chain(args));
        const arr = _(args).map((item, index) => `${item}-${index}`).compact().value()
        .join(' ');
    }
    handleClick = () => {
        const obj = _.cloneDeep(this.state.obj);
        obj.num = 2;
        this.setState({ obj: obj });
        this.lodashFn('one', 'two', 'three');
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick}>{`Study${this.state.obj.num}`}</button>
            </Fragment>
        );
    }
}