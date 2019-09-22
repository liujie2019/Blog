const co = require('co');
const fetch = require('node-fetch');

// co(function *() {
//     const res = yield fetch('http://api.douban.com/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b');
//     const moive = yield res.json();
//     const summary = moive.summary;
//     console.log(summary);
// });

// 简单模拟co库，co库的参数为一个generator生成器
// 运行有问题
function run(generator) {
    const iterator = generator(); // 生成迭代器
    const it = iterator.next();
    const promise = it.vaule;
    promise.then(data => {
        const it2 = iterator.next(data);
        const promise2 = it2.vaule;
        promise2.then(data2 => {
            iterator.next(data2);
        });
    });
}

run(function *() {
    const res = yield fetch('http://api.douban.com/v2/movie/subject/26004132?apikey=0b2bdeda43b5688921839c8ecb20399b');
    const moive = yield res.json();
    const summary = moive.summary;
    console.log(summary);
});