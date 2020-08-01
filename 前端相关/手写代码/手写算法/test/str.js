

let str = '10000000000';

function fn(str) {
    let len = str.length - 1;
    let count = 0;
    let res = '';
    while (len >= 0) {
        if (count === 3) {
            res = '.' + res;
            count = 0;
            continue;
        }
        res = str[len] + res;
        len--;
        count++;
    }
    return res;
}

console.log(fn(str));