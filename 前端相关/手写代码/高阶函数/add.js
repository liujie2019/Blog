/*
add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
add(1)(2)(3)(4)； // 10

// 以此类推
*/

function add(a) {
    function sum(b) {
        a += b;
        return sum; // 链式调用
    }
    sum.toString = function() {
        return a;
    }
    return sum;
}

add(1);