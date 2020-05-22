let _sub = (function() {
    // 发布订阅类
    class Sub {
        constructor() {
            // 创建一个事件池，用来存储后期需要执行的方法
            this.$pond = [];
        }
        // 向事件池中追加方法
        add(cb) {
            let isExit = this.$pond.some(item => item === cb);
            // 仅当函数没有被添加的时候才添加，达到去重的目的
            !isExit && this.$pond.push(cb);
        }
        // 从事件池中移除方法
        remove(cb) {
            // 也可以通过filter来删除，返回不等于cb的函数
            const index = this.$pond.findIndex(fn => fn === cb);
            this.$pond.splice(index, 1);
        }
        // 通知事件池中的方法，按照顺序依次执行
        fire(...args) {
            this.$pond.forEach(cb => {
                cb.call(this, ...args);
            });
        }
    }
    // 暴露给外面使用
    return function subscribe() {
        return new Sub();
    }
})();

let s1 = _sub();
function fn1(x) {
    console.log(1, x);
}
function fn2(x) {
    console.log(2, x);
}
function fn3(x) {
    console.log(3, x);
}
s1.add(fn1);
s1.add(fn1);
s1.add(fn2);
s1.add(fn3);
s1.remove(fn2);

s1.fire(888);