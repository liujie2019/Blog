// 实现对象的深度监控
function update() {
    console.log('数据更新了');
}

// let obj = {
//     name: 'lisi',
//     age: {num: 10}
// };
let obj = [1, 2, 3];
let oldProto = Array.prototype;
let proto = Object.create(oldProto); // 克隆了一份数组原型
// 变异方法 push shift unshift reverse sort splice pop
['shift', 'push'].forEach(method => {
    proto[method] = function () {
        // ipdate(); // AOP 在调用数组方法前做些其他事情
        update();
        oldProto[method].apply(this, arguments);
    }
});
function observer(obj) {
    // 如果是数组的不走defineReactive
    // 数组的劫持，在调用数组方法时实现劫持
    if (Array.isArray(obj)) {
        // 重写数组方法
        return obj.__proto__ = proto;
    }
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            // 定义响应式
            defineReactive(obj, key, obj[key]);
        }
    }
}

function defineReactive(obj, key, value) {
    // value有可能还是对象，需要递归
    observer(value);
    Object.defineProperty(obj, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue !== value) {
                // 设置的newValue也有可能是对象
                observer(newValue);
                update();
                value = newValue;
            }
        }
    });
}

observer(obj);
console.log(obj);
// obj.age.num = 13;
// Object.defineProperty与Proxy相比的缺点在于：
// 当给对象obj设置一个不存在的属性时，Object.defineProperty无法触发更新
// 因为新的属性没有被设置get和set访问器属性
// obj.b = 123;

// 设置的新值也是对象
// obj.age = {number: 123};
// obj.age.number = 456;

obj.push(123);
console.log(obj); // [ 1, 2, 3, 123 ]
