require('./a'); // 加载并执行a.js中的代码
// 优先从缓存加载
// 避免模块重复加载，提高模块加载效率
const test = require('./b'); // 由于在加载a.js时已经加载了b.js，所以这里直接从缓存中加载
test('我是main.js');

// 这里require('./b')只是为了得到b.js导出的接口对象