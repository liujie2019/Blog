let name = 'lisi';
let age = 9;
// 对象属性名和属性值相同，可以简写
let obj = {name, age};
console.log(obj);

const obj1 = {name: 'lisi'};
const obj2 = {name: 'lisi2'};
const obj3 = {};
// 给obj3设置原型
Object.setPrototypeOf(obj3, obj1); // 等同于obj3.__proto__ === obj1
console.log(obj3.name); // lisi
console.log(obj3.__proto__ === obj1); // true

// super
let obj1 = {
    name: 'lisi',
    getFood() {
        return '面条';
    }
};
let obj2 = {
    __proto__: obj1,
    getFood() {
        // super.getFood()读取父类的getFood方法
        return '大米' + super.getFood();
    }
};
console.log(obj2.getFood());