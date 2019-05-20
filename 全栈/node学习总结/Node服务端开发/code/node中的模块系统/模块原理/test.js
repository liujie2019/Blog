// console.log(exports === module.exports); // true

// exports.a = 123;
// module.exports.add = (x, y) => x + y;

// exports = {};
// exports.b = 456;

// module.exports = '断开联系';
// // 重新建立关系
// exports = module.exports;
exports.c = 789;
module.exports.fn = () => console.log(111);

// 给exports重新赋值，即断开exports和module.exports相同引用关系
// 此后再对exports增加成员或者修改其成员的值将跟module.exports没有关系
exports = {x: 222};
module.exports.c = 987;

// 这里并不会对module.exports造成影响
exports.d = 11111;
// 重新建立关系
exports = module.exports;
exports.fn = '我是一个变量';

// 结果：{ c: 987, fn: '我是一个变量' }
// 前面再牛逼，在这里都全部推翻了，重新赋值，最终得到的是[Function]
module.exports = () => console.log('我是一个函数');
