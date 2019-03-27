// 快速生成组件模板---rcc
import React, { Component } from 'react'

export default function A(WrapedComponent) {
    return class A extends Component {
        constructor(props) {
            super(props);
            this.state = {
                value: ''
            };
        }
        refc(instance) {
            // 通过高阶组件访问被包裹组件的ref
            // instance.getName && alert(instance.getName());
        }
        render() {
            // 通过高阶组件删除组件的props,这里otherProps中没有age属性
            const { age, ...otherProps } = this.props;
            const newProps = {
                value: this.state.value,
                onInput: this.onInputChange = e => {
                    this.setState({
                        value: e.target.value
                    });
                }
            };
            return (
                <div>
                    <h1>我是公共部分</h1>
                    {/* 通过高阶组件给组件增加属性 */}
                    <div>
                        <WrapedComponent {...newProps} ref={this.refc.bind(this)} sex="男" {...otherProps} />
                    </div>
                </div>
            );
        }
      }
}
