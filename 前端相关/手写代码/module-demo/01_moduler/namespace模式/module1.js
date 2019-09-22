/**
 * namespace模式: 简单对象封装
 * 作用: 减少了全局变量数量
 * 问题: 不安全(数据不是私有的, 外部可以直接修改)
 */
let myModule = {
    name: 'module1',
    foo() {
        console.log(`foo() ${this.name}`);
    },
    bar() {
        console.log(`bar() ${this.name}`);
    }
}