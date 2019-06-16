const fetch = require('node-fetch');

function getZhihuColumn(id) {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(column => {
            console.log(`Title: ${column.title}`);
            console.log(`Intro: ${column.intro}`);
        });
}

getZhihuColumn('feweekly');