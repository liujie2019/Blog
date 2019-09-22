const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

async function run() {
    try {
        let data = await readFileAsync('../package.json');
        data = JSON.parse(data);
        console.log(data.name); // Koa2-study
    } catch (error) {
        console.log(error);
    }
}
// 采用同步代码完成异步操作
run();