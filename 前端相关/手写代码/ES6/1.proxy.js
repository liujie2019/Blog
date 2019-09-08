let obj = {
    name: 'lisi',
    age: {num: 11}
};

function update() {
    console.log('数据更新了');
}

let handler = {
    // 需要注意Proxy代理的也只是一层代码，无法实现多层属性的代理
    set(target, key, value) {
        update();
        return Reflect.set(target, key, value); // 等同于下面的两行代码
        // target[key] = value;
        // return true;
    },
    get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
            // 递归代理
            return new Proxy(target, handler);
        }
        return Reflect.get(target, key);
    }
};
// Proxy与Reflect配套使用
// 使用Proxy对obj对象进行监听
// 不管是已有属性值的更改还是新增属性都能监听到
// Object.defineProperty对于新增属性监听不到
let proxy = new Proxy(obj, handler);

// proxy.name = 'wangwu';
// proxy.age = 12;
proxy.age.num = 111; // 数据更新了
// proxy.age会走get方法，如果age属性也是对象，继续使用Proxy代理，并把代理对象返回
// proxy.age  返回age对象的代理
// age.num 通过对象的代理获取num
// console.log(obj.age); // { name: 'wangwu' }