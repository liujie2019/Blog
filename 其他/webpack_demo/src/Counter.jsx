import React from 'react';
import ReactDom from 'react-dom';
import SubCounter from './SubCounter.jsx';

export default class Counter extends React.Component {
	constructor() {
		//1.加载初始状态
		console.log('1.加载初始状态');
		super();
		this.state = {
			num: 1
		};
	}

	componentWillMount() {
		console.log('2.父组件挂载前调用');
	}

	componentDidMount() {
		console.log('4.父组件挂载完成后调用');
	}

	shouldComponentUpdate(newProps, newState) {
		console.log('5.父组件是否进行更新');
		if(newState.num < 5) {
			return true;
		}
		else {
			return false;
		}
	}

	componentWillUpdate() {
		console.log('6.父组件更新前调用');
	}

	componentDidUpdate() {
		console.log('7.父组件更新完成后调用');
	}

	handleClick() {
		this.setState({
			num: this.state.num + 1
		});
	}

	render() {
		console.log('3.父组件挂载时调用');
		const {num} = this.state;
		return (
			<div>
				<p>{num}</p>
				<button onClick={this.handleClick.bind(this)}>
					增加
				</button>
				{	
					num < 15 ? <SubCounter num={num}/> : ''
				}
			</div>
			)
	}
}