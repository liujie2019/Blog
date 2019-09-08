function fn(n, o) {
    console.log(o);
    return {
        fn: function(m) {
            return fn(m, n);
        }
    }
}

var a = fn(0); // undefined
a.fn(1); // 0
a.fn(2); // 0
a.fn(3); // 0

var b = fn(0).fn(1).fn(2).fn(3); // undefined 0 1 2
var c = fn(0).fn(1);// undefined 0

c.fn(2); // 1
c.fn(3); // 1