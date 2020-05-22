/**
 * 使用module.exports = value向外暴露一个对象
*/
module.exports = {
    msg: 'module1 foo()',
    foo() {
        console.log(this.msg);
    }
}