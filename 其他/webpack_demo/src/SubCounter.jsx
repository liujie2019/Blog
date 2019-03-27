import React from 'react';
import ReactDom from 'react-dom';

export default class SubCounter extends React.Component {

	componentWillReceiveProps() {
		console.log('8.子组件将要接收到新属性');
	}

	shouldComponentUpdate(newProps, newState) {
		console.log('9.子组件是否进行更新');
		console.log(newProps);
		if(newProps.num < 10) {
			return true;
		}
		else {
			return false;
		}
	}

	componentWillUpdate() {
		console.log('10.子组件更新前调用');
	}

	componentDidUpdate() {
		console.log('12.子组件更新完成后调用');
	}

	componentWillUnmount() {
		console.log('13.子组件卸载前调用');
	}

	render() {
		console.log('11.子组件挂载时调用');
		const {num} = this.props;
		return (
			<div>
				{num}
			</div>
			)
	}
}