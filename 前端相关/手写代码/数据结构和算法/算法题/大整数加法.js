/**
 * 大整数加法
*/

function add(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let res = '';
    let carry = 0;
    while (i >=0 || j >= 0) {
        let x = 0;
        let y = 0;
        let sum = 0;
        // 如果a还未遍历完
        if (i >= 0) {
            x = a[i--] - '0'; // 将字符串转为数值
        }
        // 如果b还未遍历完
        if (j >= 0) {
            y = b[j--] - '0'; // 将字符串转为数值
        }
        sum = x + y + carry;
        if (sum >= 10) {
            sum -= 10;
            carry = 1;
        } else {
            carry = 0;
        }
        res = sum + res;
    }
    if (carry) {
        res = carry + res;
    }
    return res;
}

console.log(add('889', '1'));
console.log(add('999', '1'));
console.log(add('123', '321'));