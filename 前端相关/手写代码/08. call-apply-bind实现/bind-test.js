function test() {
    this.hobbies = '篮球';
    console.log(this); // test { hobbies: '篮球' }
    console.log(this instanceof bindTest); // true
    console.log(this.name + '--' + this.age);
}

test.prototype.work = '工人';

const obj = {
    name: 'lisi',
    age: 12
};

var name = 'wangwu';
var age = 12;

const bindTest = test.bind(obj);
const p = new bindTest();
console.log(p.hobbies); // 篮球
console.log(p.work); // 工人
// bindTest();