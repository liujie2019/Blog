const fetch = require('node-fetch');

const getZhihuColumn = async id => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    // 获取到专栏数据
    const response = await fetch(url);
    // 进行错误处理
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    // 将获取到的数据转为json
    // async函数的返回值是一个Promise
    return await response.json();
}

getZhihuColumn('feweekly111')
    .then(column => {
        console.log(`Title: ${column.title}`);
        console.log(`Intro: ${column.intro}`);
    }).catch(err => {
        console.error(err);
    });