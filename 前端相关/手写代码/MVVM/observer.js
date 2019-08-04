class Observer {
    constructor(data) {
        this.observer(data);
    }
    observer(data) {
        // 要对这个data数据将原有的属性改成set和get的形式
        // 如果data不存在或者不是对象，则不需要劫持
        if (!data || typeof data !== 'object') {
            return;
        }
        // 要将数据 一一劫持，先获取到data的key和value
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data, key, data[key]);
            this.observer(data[key]); // 深度劫持
        });
    }
    // 定义响应式
    defineReactive(obj, key, value) {
        let that = this;
        let dep = new Dep();  // 每个变化的数据都会对应一个数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() { // 当取值时调用的方法
                // 设置的时候可以做其他事情
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newValue) { // 当给data属性中设置值的时候，更改获取的属性的值
                if (newValue !== value) {
                    that.observer(newValue); // 如果新值是对象继续劫持
                    value = newValue;
                    dep.notify(); // 通知所有订阅者，数据更新了
                }
            }
        });
    }
}
// 发布-订阅
class Dep {
    constructor() {
        // 订阅的数组
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}