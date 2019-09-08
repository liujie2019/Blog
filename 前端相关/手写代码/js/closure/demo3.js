function outer(a) {
    return function(b) {
        return a + b;
    }
}
var add = outer(1);
var add2 = outer(2);

console.log(add(3)); // 4
console.log(add(4)); // 5
// 释放对闭包的引用
add = null;
add2 = null;