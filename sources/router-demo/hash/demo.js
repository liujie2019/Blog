/**
 * 判断是否是回文字符串
 *
 * @param {any} str
 * @returns
 */
function fn(str) {
    if(typeof str !== 'string') return false;
    return str.split('').reverse().join('') === str;
}

console.log(fn('abc')); // false
console.log(fn('abba')); // true