// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法
class Watcher {
    // 根据vm, expr来获取新的值，如果值变化了，调用cb函数
    constructor(vm, expr, cb) {
        // 将vm, expr, cb都挂载到实例属性中，方便后面使用
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // new Watcher()的时候会调用this.get()方法去vm实例上获取对应的属性值
        // 获取属性值就会调用get方法，在get方法中把当前的watcher实例添加到this.subs订阅数组中
        // 先获取旧值，当新值与老值不同时，再进行值的更新
        this.oldValue = this.get();
    }
    getVal(vm, expr) { // 获取实例上对应的数据
        expr = expr.split('.');
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    }
    get() {
        // Dep是一个全局的类，将当前的watcher实例挂载到Dep的静态属性target上
        Dep.target = this; // this就是当前的watcher实例
        const value = this.getVal(this.vm, this.expr);
        // 将Dep.target置为null，否则任何取值操作都会添加这个watcher
        Dep.target = null; // 不取消，任何值取值都会添加watcher
        return value;
    }
    // 对外暴露的方法
    // 更新操作，数据发生变化后，会调用观察者的update方法
    update() {
        // 更新的时候，先获取到新的值newValue，然后新旧值对比，发生改变了再更新
        const newValue = this.getVal(this.vm, this.expr);
        const oldValue = this.oldValue;
        if (newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}
// 用新值和旧值进行比对，如果发生变化，就调用更新方法