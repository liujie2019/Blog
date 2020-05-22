Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
     // 获取除context之外的其它参数
    const args = Array.prototype.slice.call(arguments, 1),
    // 调用bind的函数
    self = this,
    fNOP = function() {},
    fBound = function() {
        // 获取fBound调用时的参数
        const bindArgs = Array.prototype.slice.call(arguments);
        // this instanceof fBound为true时表示fBound被当做构造函数调用了
        // 当作为构造函数时，this指向实例，self指向绑定函数，因为下面一句`fbound.prototype = this.prototype;`，已经修改了fbound.prototype为绑定函数的prototype，此时结果为true，当结果为true的时候，this指向实例。
        // 当作为普通函数时，this指向window，self指向绑定函数，此时结果为false，当结果为false的时候，this指向绑定的 context。
        return self.apply(this instanceof fBound
               ? this : context,
               args.concat(bindArgs) // 将fBound的参数和args进行结合
        );
    };
    // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承函数原型中的值
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}

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

const bindTest = test.myBind(obj);
// bindTest当作构造函数调用
// 这个时候的this已经指向了p
const p = new bindTest();
console.log(p.hobbies); // 篮球
console.log(p.work); // 工人