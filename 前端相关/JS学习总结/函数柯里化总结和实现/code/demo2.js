function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}
function multiFn(a, b, c) {
    return a * b * c;
}
var multi = curry(multiFn);
console.log(multi(2, 3, 4)); // 24