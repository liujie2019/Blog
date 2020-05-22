let length = 10;
function fn() {
    console.log(this);
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function(fn) {
        fn(); // 0
        arguments[0](); // 2
    }
};

obj.method(fn, 1);

// console.log(this); // {}

// function fn() {
//     console.log(this === global); // true
// }

// fn();