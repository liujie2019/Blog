import React, { Component } from 'react';
import Person from './Person';

// 高阶组件
const HOCFactory = (WrappedComponent) => {
    return (
        class WrapperComponent extends React.Component {
            render() {
                const newProps = {
                    job: 'teacher'
                };
                return <WrappedComponent {...newProps} {...this.props} />;
            }
        }
    );
};
// 普通的组件
class WrappedComponent extends Component {
    render() {
        return (
            <div>
                高阶组件测试
                <Person name="lisi" age="23" {...this.props} />
            </div>
        );
    }
}

const HocComponent = HOCFactory(WrappedComponent);
export default HocComponent;