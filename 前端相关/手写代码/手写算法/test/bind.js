Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    let self = this;
    const outArgs = Array.from(arguments).slice(1);
    let Fn = function(){};
    let fBound = function(...innerArgs) {
        const args = [...outArgs, ...innerArgs];
        self.apply(this instanceof fBound ? this : context, args);
    }

    Fn.prototype = this.prototype;
    fBound.prototype = new Fn();

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
// bindTest();

// bindTest当作构造函数调用
// 这个时候的this已经指向了p
const p = new bindTest();
console.log(p.hobbies); // 篮球
console.log(p.work); // 工人