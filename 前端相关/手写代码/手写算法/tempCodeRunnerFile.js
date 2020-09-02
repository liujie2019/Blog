function divide(num, digit = 2) {
    let res = [];
    let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while(num > 0) {
        let rem = num % digit;
        res.push(digits[rem]);
        num = Math.floor(num / digit);
    }
    return res.reverse().join('');
}

console.log(divide(10, 2)); // 1010

console.log(divide(1231, 2)); // 输出10011001111
console.log(divide(1231, 8)); // 输出2317
console.log(divide(1231, 16)); // 输出4CF
console.log(divide(1231, 36));