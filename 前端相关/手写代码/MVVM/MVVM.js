class MVVM {
    constructor(options) {
        // 先把可用的数据挂载在实例上
        this.$el = options.el;
        this.$data = options.data;
        // 如果有要编译的模板就开始编译
        if (this.$el) {
            // 数据劫持 就是把对象的所有属性改成get和set方法
            new Observer(this.$data);
            // 数据代理，由vm.$data.message -> vm.message
            this.proxyData(this.$data);
            // 编译过程需要数据和元素
            // let vm = new MVVM() 实例化的过程中，this指向当前实例，这里就是vm
            new Compile(this.$el, this);
        }
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
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