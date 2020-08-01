Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('call must be called on a function');
    }
    context = context || window;
    context.fn = this;
    let result;
    // 判断是否存在第二个参数，如果存在，则第二个参数展开
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}


const obj = {
    name: 'lisi',
    age: 22
};

function getInfo() {
    console.log(this.name + '--' + this.age);
}

getInfo.myApply(obj, [1, 2, 3]);