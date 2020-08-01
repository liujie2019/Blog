function test(...args) {
    this.hobbies = '篮球';
    console.log(this); // test { hobbies: '篮球' }
    console.log(this instanceof bindTest); // true
    console.log(this.name + '--' + this.age);
    console.log(args); // [ 1, 2 ]
}

test.prototype.work = '工人';

const obj = {
    name: 'lisi',
    age: 12
};

var name = 'wangwu';
var age = 12;

const bindTest = test.bind(obj, 1, 2);
// bind后的函数当做构造函数调用
const p = new bindTest();
console.log(p.hobbies); // 篮球
console.log(p.work); // 工人
// bindTest();