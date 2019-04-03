// defineProperty定义的属性默认是不可枚举的
Object.defineProperty(Object.prototype, 'x', {
    writable: true,
    value: 1
});
var obj = {};
console.log(obj.x);
for (var key in obj) {
    console.log(key);
}