function bind(context, ...outerArgs) {
    if (typeof this !== 'function') {
        throw new Error();
    }
    const self = this;
    function Fn() {};
    const fBound = function(...innerArgs) {
        const args = [...outerArgs, ...innerArgs];
        return self.apply(this instanceof fBound ? this : context, args);
    }
    Fn.prototype = self.prototype;
    fBound.prototype = new Fn();
    return fBound;
}