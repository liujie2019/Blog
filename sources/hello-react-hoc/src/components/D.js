import React, { Component } from 'react';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const modifyPropsHOC = WrappedComponent => {
    return class NewComponent extends WrappedComponent {
        static displayName = `NewComponent(${getDisplayName(WrappedComponent)})`;
        // 通过继承方式的高阶组件修改生命周期函数
        componentWillMount() {
            alert('我是修改后的生命周期');
        }

        render() {
            const element = super.render(); // 拿到组件渲染的元素
            const newStyle = {
                color: element.type === 'div' ? 'red' : 'green'
            };
            const newProps = {...this.props, style: newStyle};
            return React.cloneElement(element, newProps, element.props.children);
        }
    }
}
export default modifyPropsHOC;