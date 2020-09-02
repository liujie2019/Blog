
function divideBy2(num) {
    let temp = [];
    while (num > 0) {
        let rem = num % 2; // 获取余数
        temp.push(rem);
        num = Math.floor(num / 2);
    }
    return temp.reverse().join('');
}

console.log(divideBy2(10)); // 1010

/**
 * 进制转换，基于余数实现
 * 二进制转换时 余数可能为0、1
 * 八进制转换时 余数可能为0-7
 * 十六进制转换时 余数可能为0-15
10进制是 0-9 （0123456789）
16进制是 0-F （0123456789ABCDEF）
36进制是 0-F （0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ）
*/
function divide(num, digit) {
    let temp = [];
    let digits = '0123456789ABCDEF';
    while (num > 0) {
        let rem = num % digit; // 获取余数
        temp.push(digits[rem]);
        num = Math.floor(num / digit); // 商向下取整
    }
    return temp.reverse().join('');
}

// function divide(num, digit = 2) {
//     let res = [];
//     let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     while(num > 0) {
//         let rem = num % digit;
//         res.push(digits[rem]);
//         num = Math.floor(num / digit);
//     }
//     return res.reverse().join('');
// }

// 默认二进制
function divide(num, digit = 2) {
    let res = [];
    let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while(num > 0) {
        let rem = num % digit;
        res.push(digits[rem]);
        num = Math.floor(num/digit);
    }
    return res.reverse().join('');
}

console.log(divide(10, 2)); // 1010

console.log(divide(1231, 2)); // 输出10011001111
console.log(divide(1231, 8)); // 输出2317
console.log(divide(1231, 16)); // 输出4CF
console.log(divide(1231, 36)); // Y7
