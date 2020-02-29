// import { type } from "os";

// function add(a:number, b:number):number {
//     return a + b;
// }
// const add2 = (a:number, b:number):number => a + b;

// 定义一个函数类型
// let add:(a:number, b:number) => number;
// add = (a:number, b:number):number => a + b;
// add = (a:string, b:number):number => a + b; // 报错

type Add = (a:number, b:number) => number;
// type isString = string;
// const strasd:isString = '123';
let addFn:Add; // 声明一个变量为Add类型
addFn = (a:number, b:number):number => a + b;

const arr1 = [1];
const arr11 = [2, 3, 4];
arr1.push(arr11); // [1, Array(3)]
console.log(arr1);
arr1.push(arr11);
console.log(arr1); //  [1, Array(3), 2, 3, 4]
