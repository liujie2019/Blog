const a = '123';
const add = (x, y) => x + y;

// exports.a = a;
// exports.add = add;
// 等价于
// module.exports.a = a;
// module.exports.add = add;

module.exports = {
    a,
    add
};
// 导出单个成员
// module.exports = a;