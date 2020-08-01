Function.prototype.myCall = (context, ...args) => {
    if (typeof this !== 'function') {
        throw new TypeError('call must be called on a function');
    }
    context = context || window;
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
};