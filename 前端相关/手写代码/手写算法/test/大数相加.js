
function add(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let res = '';
    let carry = 0;
    while(i >= 0 || j >= 0 || carry) {
        let x = 0;
        let y = 0;
        let sum = 0;
        if (i >= 0) {
            // i--指针向前移动
            x = a[i--] - 0;
        }
        if (j >= 0) {
            y = b[j--] - 0;
        }
        sum = x + y + carry;
        if (sum >= 10) {
            sum = sum % 10;
            carry = 1;
        } else {
            carry = 0;
        }
        res = sum + res;
    }
    return res;
}

console.log(add('889', '1'));
console.log(add('999', '1'));
console.log(add('123', '321'));