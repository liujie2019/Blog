const superAgent = require('superagent');
const cheerio = require('cheerio');
const url = 'http://www.baidu.com/';

// 发起get请求
superAgent
    .get(url)
    .end((err, res) => {
        if(err) console.error(err);
        // 使用cheerio处理返回的html
        const $ = cheerio.load(res.text);
        // 找到并打印出按钮#su的值
        console.log($('#su').val()); // 百度一下
    });