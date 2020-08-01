Function.prototype.myBind = function(context) {
    // this指向调用bind的函数
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function');
    }
    // slice方法可以将类数组对象转为数组
    const args = Array.prototype.slice.call(arguments, 1); // 获取调用bind函数时传入的参数
    const self = this;
    const Fn = function(){};
    // 考虑fBound被当做构造函数调用
    const fBound = function() {
        const innerArgs = Array.prototype.slice.call(arguments);
        const allArgs = [...args, ...innerArgs];
        return self.apply(this instanceof fBound ? this : context, allArgs);
    }
    Fn.prototype = this.prototype;
    fBound.prototype = new Fn();
    return fBound;
}