function* sendRequest() {
    const url = yield getData('http://www.example.com/news?newsID=123');
    yield getData(url);
}

function getData(url) {
    $.get(url, data => {
        console.log(data);
        const commentsUrl = data.commentsUrl;
        const resUrl = `http://www.example.com/${commentsUrl}`;
        // 当获取新闻内容成功，发送请求获取对应的评论内容
        // 调用next传参会作为上次暂停是yield的返回值
        gen.next(resUrl);
    });
}

const gen = sendRequest();
gen.next(); // 发送获取新闻内容请求