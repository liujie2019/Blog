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
// 处理async函数中的错误
const getColumnInfo = async () => {
    try {
        const column = await getZhihuColumn('feweekly111');
        console.log(`Title: ${column.title}`);
        console.log(`Intro: ${column.intro}`);
    } catch (error) {
        console.error(error);
    }

};

getColumnInfo('wer');