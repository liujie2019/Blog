// let fn = function(name, age) {
//     console.log(name); // lisi
//     console.log(this); // { a: 2 }
// }.bind({a: 2});

// fn('lisi', 12);

// function fn() {
//     var a = 2;
//     return function() {
//         console.log(a); // a是自由变量，会去父作用域查找
//     }
// }

// let f = fn();
// var a = 3;
// f();
function fn() {
    var a = 2;
    return function() {
        console.log(a); // a是自由变量，会去父作用域查找
    }
}

let f = fn();
function fn2(fn) {
    var a = 3;
    fn();
}
fn2(f);