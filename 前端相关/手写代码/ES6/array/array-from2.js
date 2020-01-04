function sum() {
    return Array.from(arguments).reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

const str = 'hello';
console.log(Array.from(str)); // [ 'h', 'e', 'l', 'l', 'o' ]