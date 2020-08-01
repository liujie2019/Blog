/**
 * 有一个"123456789101112131415....n+1"类似这样的序列，求出第m位的数字
*/

function fn (n, m) {
    let res = '';
    for (let i = 1; i <= n+1; i++) {
        res += i;
    }
    return res.split('')[m-1];
}

console.log(fn(20, 11));
console.log(fn(20, 12));
