// Symbol在对象中的应用
// 看一下如何用Symbol构建对象的Key，并调用和赋值。

const test = Symbol();
const obj = {
    [test]: 'liujie'
}
console.log(obj[test]);
obj[test]='liujie26';
console.log(obj[test]);