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
            // const index = this.$pond.findIndex(fn => fn === cb);
            // this.$pond.splice(index, 1);
            let $pond = this.$pond;
            for (let i = 0; i < $pond.length; i++) {
                let fn = $pond[i];
                if (fn === cb) {
                    // 这里不能真正移除，会导致数组塌陷问题，只能先设置为null
                    $pond[i] = null;
                    break;
                }
            }
        }
        // 通知事件池中的方法，按照顺序依次执行
        fire(...args) {
            // this.$pond.forEach(cb => {
            //     cb.call(this, ...args);
            // });
            let $pond = this.$pond;
            for (let i = 0; i < $pond.length; i++) {
                let fn = $pond[i];
                // 此时再真正删除
                if (typeof fn !== 'function') {
                    $pond.splice(i, 1);
                    i--;
                    continue;
                }
                fn.call(this, ...args);
            }
        }
    }
    // 暴露给外面使用
    return function subscribe() {
        return new Sub();
    }
})();