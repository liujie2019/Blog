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
            this.observer(data[key]); // 深度递归劫持
        });
    }
    // 定义响应式
    defineReactive(obj, key, value) {
        const that = this;
        // 给每一个属性 都加上一个具有发布订阅的功能
        const dep = new Dep(); // 每个变化的数据都会对应一个数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() { // 当取值时调用的方法
                // 设置的时候可以做其他事情
                // Dep.target是指向当前的watcher实例
                // 创建watcher时，会获取对应属性的值，并把当前的watcher实例挂载到了Dep.target上
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newValue) => { // 当给data属性中设置值的时候，更改获取的属性的值
                if (newValue !== value) {
                    that.observer(newValue); // 如果新值是对象，则需要对新值继续劫持
                    value = newValue;
                    // 每个属性都有自己对应的Dep，当属性变化时，调用notify方法通知观察者数据更新了
                    dep.notify(); // 通知所有订阅者，数据更新了
                }
            }
        });
    }
}
// 发布-订阅
class Dep {
    constructor() {
        // 订阅的数组，存放所有的watcher
        this.subs = [];
    }
    addSub(watcher) { // 添加watcher
        this.subs.push(watcher);
    }
    notify() { // 发布
        this.subs.forEach(watcher => watcher.update());
    }
}