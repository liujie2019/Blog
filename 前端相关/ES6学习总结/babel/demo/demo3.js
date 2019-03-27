function multi() {
    var args = Array.prototype.slice.call(arguments);
	var fn = function() {
		var newArgs = args.concat(Array.prototype.slice.call(arguments));
        return multi.apply(this, newArgs);
    }
    fn.toString = function() {
        return args.reduce(function(a, b) {
            return a * b;
        })
    }
    return fn;
}
console.log(multi(2, 2)(3)(4)(5).toString());