import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import styles from './app.css';


export default class App extends React.Component{
	render(){
		return(
			<div className={styles.box}>
				{config.greetText}
			</div>
			);
	}
}