const obj = {};
Object.defineProperty(obj, 'name', {
    value: 'lisi' , //由于设定了writable属性为false 导致这个量不可以修改
    writable: false
});
console.log(obj.name); // 输出lisi
obj.name = 'wangwu';
console.log(obj.name); // 输出lisi