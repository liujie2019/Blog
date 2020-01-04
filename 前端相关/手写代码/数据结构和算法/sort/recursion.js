/**
 * 递归
*/

function sum(n) {
    if (n > 10) return 0;
    return n + sum(n + 1);
    // return 1+sum(2)
    // return 1+2+sum(3)
    // return 1+2+3+sum(4)
    // ...
    // return 1+2+...+10+sum(11) = 55
}

const total = sum(1);
console.log(total); // 55