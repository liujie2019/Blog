/**
 * 写一个处理加法可能产生精度的函数，比如 0.1 + 0.2 = 0.3
 *思路：浮点数转化为整数进行处理，同时乘以一个倍数(A)，然后加起来后再除以这个倍数(A)，这个倍数应该是两个数中最小的那个数的倍数，比如 0.1 + 0.02 ,那么应该同时乘以 100，变为 10 + 2，然后再将值除以 100。
*/

function add(a, b) {
    const num = Math.max(a.toString().split('.')[1].length, b.toString().split('.')[1].length);
    return (a * (10 ** num) + b * (10 ** num)) / 10 ** num;
}

console.log(add(0.1, 0.02)); // 0.12
console.log(0.1 + 0.02);