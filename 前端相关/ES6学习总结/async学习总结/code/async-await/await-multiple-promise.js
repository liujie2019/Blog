const fetch = require('node-fetch');
const sleep = (timeout = 2000) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};
const getZhihuColumn = async id => {
    // 延迟2秒
    await sleep(2000);
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
    console.time('getColumnInfo');
    try {
        // 多个await串行
        const column = await getZhihuColumn('feweekly');
        const toolingtips = await getZhihuColumn('toolingtips');
        console.log(`Title: ${column.title}`);
        console.log(`Intro: ${column.intro}`);

        console.log(`Title: ${toolingtips.title}`);
        console.log(`Intro: ${toolingtips.intro}`);
    } catch (error) {
        console.error(error);
    }
    console.timeEnd('getColumnInfo');
};

getColumnInfo('wer');