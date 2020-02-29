const obj = {};
let initValue = 1;

Object.defineProperty(obj, 'a', {
    get() {
        console.log('监听了getter方法');
        return initValue;
    },
    set(newValue) {
        console.log('监听了setter方法');
        initValue = newValue;
    }
});

obj.a = 2; // 打印：监听了setter方法
obj.a = []; // 打印：监听了setter方法
obj.a = [1, 2]; // 打印：监听了setter方法

obj.a[0] = 11; // 打印：监听了getter方法
obj.a.push(3); // 打印：监听了getter方法

console.log(obj.a);
obj.a.length = 5;
console.log(obj.a);
