// s和a都是独一无二的值
const s = Symbol();
const a = Symbol();
console.log(typeof s); // symbol
console.log(a === s); // false