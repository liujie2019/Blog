Function.prototype.myApply = (context, args) => {
    if (typeof this !== 'function') {
        throw new TypeError('apply must be called on a function');
    }
    context = context || window;
    context.fn = this;
    let res;
    // 兼容不传递参数的情况
    if (args && args.length) {
        res = context.fn(...args);
    } else {
        res = context.fn();
    }
    delete context.fn;
    return res;
};