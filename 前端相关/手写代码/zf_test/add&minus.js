/**
 * 实现(5).add(3).minus(2),使其输出结果为6
*/
// 实现一个闭包
~function() {
    // 每一个方法执行完，都要返回Number这个类的实例，这样才可以继续调用Number类原型中的方法(链式操作)
    function checkNum(n) {
        n = Number(n);
        return isNaN(n) ? 0 : n;
    }
    function add(n) {
        return this + n;
    }
    function minus(n) {
        return this - n;
    }
    ['add', 'minus'].forEach(method => {
        Number.prototype[method] = eval(method);
    });
}();

console.log((5).add(3).minus(2)); // 6