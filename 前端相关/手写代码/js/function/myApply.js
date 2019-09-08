Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw Error('not a function');
    }
    context.fn = this;
    // 如果myApply有参数
    console.log(arguments);
    // arguments[1]本身就是数组
    if (arguments[1]) {
        // console.log(...arguments[1]);
        // 利用展开运算符(...)将数组参数展开
        return context.fn(...arguments[1]);
    }
    return context.fn();
}
var name = 'windowName';
const obj = {
    name: 'lisi',
    sayName: function() {
        console.log(this);
        console.log([...arguments]); // [ 3, 2, 4 ]
        console.log(this.name);
    }
};

const fn = obj.sayName;
// fn(); // windowName
fn.myApply(obj, [3, 2, 4]); // lisi