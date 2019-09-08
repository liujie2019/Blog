Function.prototype.myCall = function(context) {
    if(typeof this !== 'function') {
        throw Error('not a function');
    }
    // 将this指向调用myCall的function
    context.fn = this;
    // 将[...arguments]转为数组
    const args = [...arguments].slice(1);
    // console.log(...args); // 1 2 4 6
    const res = context.fn(...args);
    delete context.fn;
    return res;
}
var name = 'windowName';
const obj = {
    name: 'lisi',
    sayName: function() {
        // console.log(this);
        console.log([...arguments]); // [1, 2, 4, 6]
        console.log(this.name);
    }
};

const fn = obj.sayName;
// fn(); // windowName
fn.myCall(obj, 1, 2, 4, 6); // lisi
