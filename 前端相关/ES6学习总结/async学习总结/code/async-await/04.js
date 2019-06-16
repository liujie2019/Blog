const fetch = require('node-fetch');

const getZhihuColumn = async id => {
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    // 获取到专栏数据
    const response = await fetch(url);
    // 将获取到的数据转为json
    // async函数的返回值是一个Promise
    return await response.json();

}
// 将任意类型的函数转成async风格
class ClientAPI {
    async getColumn(id) {
        const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
        // 获取到专栏数据
        const response = await fetch(url);
        console.log(response.status); // 200
        console.log(response.statusText); // OK
        // 将获取到的数据转为json
        // async函数的返回值是一个Promise
        return await response.json();
    }
}

(async () => {
    const client = new ClientAPI();
    const column = await client.getColumn('feweekly');
    // const column = await getZhihuColumn('feweekly');
    console.log(`Title: ${column.title}`);
    console.log(`Intro: ${column.intro}`);
})();
