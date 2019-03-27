import React from 'react';
import URL from 'url';
import Moment from 'moment';
import '../../style/NewsItem.css';
import ImageGrayArray from '../../img/grayarrow.gif';

export default class NewsItem extends React.Component{
	getRank(){
		return(
			<div className="NewsItem-rank">
				{this.props.rank}.
			</div>
			);
	}
	getVote(){
		return(
		<div className="NewsItem-vote">
			<a href={"https://news.ycombinator.com/vote?id=" + this.props.item.id + "&how=up&goto=news"}>
					<img src={ImageGrayArray} width="10" />
			</a>
		</div>
		);
	}
	//获取域名
	//URL.parse()方法将一个URL字符串转换成对象并返回
	getDomain(){
		return URL.parse(this.props.item.url).hostname;
	}
	//获取名称
	getTitle(){
		return(
		<div className="NewsItem-title">
			<a className="NewsItem-titleLink" href={this.props.item.url}>
				{this.props.item.title}
			</a>
			{
				this.props.item.url && <span className="NewItem-titleDomain">
					<a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>
					 ({this.getDomain()})
					 </a>
				</span>
			}
		</div>
		);
	}
	getCommentLink(){
		let commentText = "discuss";
		if(this.props.item.kids && this.props.item.kids.length)
			commentText = this.props.item.kids.length + " comments";
		return(
			<a href={"https://news.ycombinator.com/item?id=" + this.props.item.id}>{commentText}</a>
		);
	}
	getSubtext(){
		return(
		<div className="NewsItem-subtext">
			{this.props.item.score} points by
			{' '}
			<a href={"https://news.ycombinator.com/user?id=" + this.props.item.by}>
				{this.props.item.by} {Moment.utc(this.props.item.time * 1000).calendar()}
			</a> | {this.getCommentLink()}
		</div>
		);
	}
	render(){
		return(
			<div className="NewsItem">
				{this.getRank()}
				{this.getVote()}
				{this.getTitle()}
				{this.getSubtext()}
			</div>
			);
	}
}
