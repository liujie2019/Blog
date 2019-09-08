// es5定义函数
// 函数声明
// function run() {
//     return 'run';
// }
// // 函数表达式
// let run2 = function() {
//     return 'run2';
// }

// // ts定义函数
// function run(): string {
//     return 'test';
// }
// // 函数表达式
// let run2 = function():number {
//     return 123;
// }
// 参数和返回值均有类型
// function getInfo(name: string, age: number): string {
//     return `${name}----${age}`;
// }

// console.log(getInfo('lisi', 20)); // lisi----20
// // 函数表达式
// let getInfo2 = function(name: string, age: number): string {
//     return `${name}----${age}`;
// }
// // 没有返回值的方法
// function run():void {
//     console.log('我没有返回值');
// }

// 可选参数
// es5中方法的实参和形参可以不一样，但是在ts中必须一样，如果不一样就需要配置可选参数

// 默认参数
// function test(name:string, age:number=20):string {
//     let res:string = '';
//     res = `找到了${name}`;
//     if (age) {
//         res += age;
//     }
//     return `${res}同学`;
// }
// console.log(test('lisi'));
// console.log(test('lisi', 30));

// 剩余参数，采用ES6中的剩余运算符
// function sum(a:number, ...args:number[]):number {
//     let sum:number = a;
//     sum = args.reduce((previousValue:number, currentValue:number) => {
//         return previousValue + currentValue;
//     }, sum);
//     return sum;
// }

// console.log(sum(1, 2, 3, 4, 5)); // 15

// 函数重载
// es5中出现同名函数，后面的函数定义会覆盖前面的
// function fn(a) {}

// function fn(a, b) {}
// ts中重载
// 参数一致
// function getInfo(name:string):string;
// function getInfo(age:number):string;
// function getInfo(str:any):any {
//     if (typeof str === 'string') {
//         return `我叫${str}`;
//     }
//     return `我的年龄是${str}`;
// }

// console.log(getInfo(12));
// console.log(getInfo('lisi'));
// console.log(getInfo(true)); // 错误写法
// 参数不一致
function getInfo(name:string):string;
function getInfo(name:string, age:number):string;
function getInfo(name:any, age?:number):any {
    if (age) {
        return `我叫${name},我的年龄是${age}`;
    }
    return `我叫${name}`;
}

console.log(getInfo('lisi', 12)); // 我叫lisi,我的年龄是12
console.log(getInfo('lisi')); // 我叫lisi