Function.prototype.call = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('call only be called by function');
    }
    context = context || window; // 没有指定this指向或者为null时，默认指向window
    context.fn = this;
    const args = Array.from(arguments).slice(1);
    const res = context.fn(...args);
    delete context.fn;
    return res;
}

var name = 'wangwu';

const obj = {name: 'lisi'};

function say(age) {
    console.log(this.name, age);
}

say(12);

say.call(obj, 18);