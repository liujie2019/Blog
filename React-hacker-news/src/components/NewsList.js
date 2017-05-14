import React from 'react';
import NewsHeader from './NewsHeader.js';
import NewsItem from './NewsItem.js';
import '../../style/NewsList.css';

export default class NewsList extends React.Component{
	render(){
		return(
			<div className="NewsList">
				<NewsHeader/>
				<div className="NewsList-item">
					{
						this.props.items.map(
								(item,index) =>
								<NewsItem item={item} rank={index+1} key={'item-' + index}/>
							)
					}
				</div>
			</div>
			);
	}
}

