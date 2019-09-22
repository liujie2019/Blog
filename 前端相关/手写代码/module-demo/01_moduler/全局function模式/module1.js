/**
 * 全局函数模式: 将不同的功能封装成不同的全局函数
 * 问题：Global被污染了，容易引起命名冲突
 */
var a = 'module1';
function foo() {
    console.log(`${a} foo`);
}
function bar() {
    console.log('module1 bar');
}