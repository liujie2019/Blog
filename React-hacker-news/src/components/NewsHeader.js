import React from 'react';
import imageLogo from '../../img/y18.gif';
import '../../style/NewsHeader.css';

export default class NewsHeader extends React.Component{
	//获取logo函数
	getLogo(){
		return(
			<div className="newsHeader-logo">
				<a href="http://www.ycombinator.com/">
					<img src={imageLogo}/>
				</a>
			</div>
			);
	}
	getTitle(){
		return(
			<div className="newsHeader-title">
				<a className="newsHeader-textLink" href="https://news.ycombinator.com/news">
					Hacker News
				</a>
			</div>
		);
	}
	getNav(){
		let navLinks = [
			{
				name: "new",
				url: "newest"
			},
			{
				name: "comments",
				url: "newcomments"
			},
			{
				name: "show",
				url: "show"
			},
			{
				name: "ask",
				url: "ask"
			},
			{
				name: "jobs",
				url: "jobs"
			},
			{
				name: "submit",
				url: "submit"
			}
		];
		return(
		<div className="newsHeader-nav">
			{
				navLinks.map(
				(navLink) =>
				<a key={navLink.name} className="newsHeader-navLink" href={"https://news.ycombinator.com/" + navLink.url}>
				{navLink.name}
				</a>
				)
			}
		</div>
		);
	}
	getLogin(){
		return(
		<div className="newsHeader-login">
			<a href="https://news.ycombinator.com/login?goto=news" className="newsHeader-loginLink">
			login
			</a>
		</div>
		);
	}
	render(){
		return(
			<div className="newsHeader clearfix">
				{this.getLogo()}
				{this.getTitle()}
				{this.getNav()}
				{this.getLogin()}
			</div>
			);
	}
}
