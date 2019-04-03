const mySymbol = Symbol();
const obj = {};
obj[mySymbol] = 'hello';
console.log(obj[mySymbol]); // hello