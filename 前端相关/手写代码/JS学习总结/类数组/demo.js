// function sum(a, b, c) {
//     console.log(arguments);
//     // arguments[1] = 100;
//     return a + b + c;
// }
// console.log(sum.length);
// console.log(sum(1, 2, 3));

function sum(a, b, c) {
    console.log(arguments); // { '0': 1, '1': 2 }
    console.log(a, arguments[0]); // 1 1
    // 改变实参
    a = 11;
    console.log(a, arguments[0]); // 11 11
    // 改变arguments
    arguments[0] = 111;
    console.log(a, arguments[0]); // 111 111
    console.log(c); // undefined
    c = 3;
    console.log(c, arguments[2]); // 3 undefined
    return a + b + c;
}

sum(1, 2);