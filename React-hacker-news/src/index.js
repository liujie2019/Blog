import React from 'react';
import ReactDOM from 'react-dom';
import NewsList from './components/NewsList.js';
import $ from 'jquery';

function get(url){
	return Promise.resolve($.ajax(url));
}
//stories是ajax请求返回来的数据
get('https://hacker-news.firebaseio.com/v0/beststories.json').
then((infos) =>
	Promise.all(infos.slice(0, 30).map(
		itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')
		))
).
then((items) => {
	console.log(items);
	ReactDOM.render(
		<NewsList items={items}/>,
		document.getElementById("content")
		);
}).catch(
	(err) => console.log('出错了',err)
);

ReactDOM.render(
	<div className="box" style={{width:300,height:300,margin:'auto'}}>
		数据加载中！<br/>
		请耐心等待！
	</div>,
	document.getElementById("content")
	);
