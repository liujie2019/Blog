class MVVM {
    constructor(options) {
        const {el, data, computed, mounted, methods} = options;
        // 先把可用的数据挂载在实例上
        this.$el = el;
        this.$data = data;
        this.computed = computed;
        this.methods = methods;
        // 如果有要编译的模板就开始编译
        if (this.$el) {
            this.initComputed(); // 初始化computed

            // 数据代理，vm上的取值操作都代理到vm.$data上，即vm.message等同于vm.$data.message
            this.proxyData(this.$data);
            // 数据劫持 就是把对象的所有属性(this.$data中的属性)改成get和set方法
            new Observer(this.$data);
            // 编译过程需要数据和元素
            // const vm = new MVVM() 实例化的过程中，this指向当前实例，这里就是vm
            new Compile(this.$el, this);
            mounted.call(this);
        }
    }
    initComputed() {
        const computed = this.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                // {{getHelloWord}} => vm.$data.getHelloWord
                // 在getVal方法中，取值是从vm.$data中取的
                // 所以这里要将计算属性代理到this.$data上，而不是this上
                Object.defineProperty(this.$data, key, {
                    // 这里判断是computed里的key是对象还是函数
                    // 如果是函数直接就会调get方法
                    // 如果是对象的话，手动调一下get方法即可
                    get: () => {
                        return typeof computed[key] === 'function' ? computed[key].call(this) : computed[key].get.call(this);
                    },
                    set: function() {}
                });
            });
        }
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            // this就是当前vm实例
            Object.defineProperty(this, key, {
                configurable: false, // 不可删除
                enumerable: true,
                get() {
                    return data[key];
                },
                set(newValue) {
                    data[key] = newValue;
                }
            });
        });
    }
}