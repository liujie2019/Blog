let s = Symbol();
console.log(s);
let s2 = Symbol();
console.log(s === s2); // false
// let s3 = Symbol({name: 'lisi'}); // 会报错

const s4 = Symbol('test');
console.log(s4.toString()); // 'Symbol(test)'
console.log(Boolean(s4)); // true
console.log(!s4); // false

let prop = 'name';
const info = {
    [prop]: 'lisi'
}
console.log(info); // {name: "lisi"}

const s5 = Symbol('name');
// Symbol值是独一无二的，可以确保属性不会被覆盖
const info2 = {
    [s5]: 'lisi',
    name: 'haha',
    age: 12
}
console.log(info2); // {Symbol(name): "lisi"}
// Symbol类型的属性只能通过方括号的形式来访问
info2[s5] = 'wangwu';
console.log(info2); // {Symbol(name): "wangwu"}

for (const key in info2) {
    // Symbol类型的属性不会被遍历
    console.log(key); // name age
}
console.log(Object.keys(info2)); // ["name", "age"]
console.log(Object.getOwnPropertyNames(info2)); // ["name", "age"]
console.log(JSON.stringify(info2)); // {"name":"haha","age":12}
// 上述四种方式都无法获取到Symbol类型的属性

console.log(Object.getOwnPropertySymbols(info2)); // [Symbol(name)]
console.log(Reflect.ownKeys(info2)); // ["name", "age", Symbol(name)]

const s6 = Symbol('name');
const s7 = Symbol('name');
// console.log(s6 === s7);

const s8 = Symbol.for('name');
const s9 = Symbol.for('name');
// console.log(s8 === s9);
console.log(Symbol.keyFor(s8)); // name
console.log(Symbol.keyFor(s6)); // undefined

// Symbol.hasInstance
const obj = {
    [Symbol.hasInstance](otherObj:object) {
        console.log(otherObj); // {a: 123}
    }
}
console.log({a: 123} instanceof <any>obj); // false

// let arrTest = [1, 2];
// let arrTest2:number[] = [];
// console.log(arrTest2.concat(arrTest, [3, 4])); //  [1, 2, 3, 4]
// arrTest[Symbol.isConcatSpreadable] = false;
// console.log(arrTest2.concat(arrTest, [3, 4])); // [Array(2), 3, 4]

class A extends Array {
    constructor(...args) {
        super(...args);
    }
    // 对衍生对象的构造函数进行修改
    static get [Symbol.species]() {
        return Array;
    }
}
const aa = new A(1, 2, 3);
const aaa = aa.map(item => item * 2);
console.log(aaa); // [2, 4, 6]
console.log(aaa instanceof A); // false
console.log(aaa instanceof Array); // true

let obj3 = {
    [Symbol.match](str:string) {
        console.log(str.length); // 4
    }
}

'asdf'.match(<RegExp>obj3);

const arr123 = [1, 2, 3];
const it = arr123[Symbol.iterator]();
console.log(it); // Array Iterator {}
console.log(it.next()); // {value: 1, done: false}