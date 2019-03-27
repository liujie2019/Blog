var x = 0;
var foo = {
    x: 1,
    bar: {
        x: 2,
        baz: function () {
            console.log(this.x);
        }
    }
}

var a = foo.bar.baz;
foo.bar.baz(); // 2
a(); //0
a.apply(foo); //1