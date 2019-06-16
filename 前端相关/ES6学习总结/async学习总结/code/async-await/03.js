const fetch = require('node-fetch');

async function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    // 获取到专栏数据
    const response = await fetch(url);
    // 将获取到的数据转为json
    // async函数的返回值是一个Promise
    return await response.json();

}
// 将async函数用在Promise链中
getZhihuColumn('feweekly')
    .then(column => {
        console.log(`Title: ${column.title}`);
        console.log(`Intro: ${column.intro}`);
    });