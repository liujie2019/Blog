/**
 * @author liujie
 * @date 2018/8/2
 * @class Observer
 */
class Observer {
    constructor(data) {
        this.observe(data);
    }
    /**
     * 将所有data数据改成set和get的形式
     * @param data
     */
    observe(data) {
        // 如果数据不存在或者数据不是对象
        if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
            return;
        }
        // 将数据一一劫持，先获取到data的key和value
        Object.keys(data).forEach(key => {
            //劫持，若data[key]是个对象，需要递归劫持
            if (Object.prototype.toString.call(data[key]) === '[object Object]') {
                this.observe(data[key]);
            }
            this.defineReactive(data, key, data[key]);
        });
    }

    /**
     * 定义响应式，在赋新值的时候加点中间过程
     * @param obj 数据对象
     * @param key 数据对象属性
     * @param value 属性值
     */
    defineReactive(obj, key, value) {
        // 每个变化的数据都会对应一个数组，这个数组存放所有更新的操作
        const dep = new Dep();
        // 通过Object.defineProperty方法, 把data对象的所有属性，改成访问器类型属性，添加get和set方法
        Object.defineProperty(obj, key, {
            enumerable:true, //可枚举
            configurable:true, // 可删除
            // 取值时调用的方法
            get() {
                //Dep.target是Watcher实例，实例化Watcher后，才有Dep.target，只有Dep.target存在才执行这条语句
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            //给data属性中设置值时，更改获取的属性的值
            set(newValue) {
                if(newValue !== value) {
                    value = newValue;
                    dep.notify();//通知全体，数据更新了
                }
            }
        });
    }
}