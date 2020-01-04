let obj = {
    a: 1,
    b: 2
};

// es5 访问器属性 Object.defineProperty
let c = 3;
let obj = {
    get a() {
        return c === 3 ? 3 : 0;
    },
    set a(value) {
        c = value;
    }
}
console.log(obj.a);

let o = {};
let val = '111';
// Object.defineProperty定义的属性不能枚举
Object.defineProperty(o, 'name', {
    enumerable: true, // 设置属性可枚举
    configurable: true, // 设置属性可删除
    get() {
        return val;
    },
    set(value) {
        val = value;
    }
});
delete o.name;
console.log(o); // { name: [Getter/Setter] }

// 实现对象的深度监控