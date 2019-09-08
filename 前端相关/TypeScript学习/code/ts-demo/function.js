// ...items 剩余运算符
function push(array, ...items) {
    console.log(items); // [ 1, 2, 3, 4 ]
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3, 4);
console.log(a);