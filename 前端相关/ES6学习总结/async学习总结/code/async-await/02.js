const fetch = require('node-fetch');

async function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    // 获取到专栏数据
    const response = await fetch(url);
    // 将获取到的数据转为json
    const columnInfo = await response.json();
    console.log(`Title: ${columnInfo.title}`);
    console.log(`Intro: ${columnInfo.intro}`);
}

getZhihuColumn('feweekly');