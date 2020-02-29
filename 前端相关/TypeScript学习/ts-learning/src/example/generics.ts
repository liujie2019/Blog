// 泛型
// const getArray = (value:any, times:number = 5) => {
//     return new Array(times).fill(value);
// }

// console.log(getArray(6, 6)); // [ 6, 6, 6, 6, 6, 6 ]

// 泛型约束
// const getArray = <T>(value:T, times:number = 5):T[] => {
//     return new Array(times).fill(value);
// }

// // 函数调用的时候传入泛型值
// console.log(getArray<string>('6', 6)); // [ '6', '6', '6', '6', '6', '6' ]

// // 约束返回值是元组类型的数组
// const getArray = <T, U>(param1:T, param2:U, times:number):Array<[T, U]> => {
//     return new Array(times).fill([param1, param2]);
// }

// console.log(getArray<number, string>(1, 'a', 3)); // [ [ 1, 'a' ], [ 1, 'a' ], [ 1, 'a' ] ]

// // 泛型约束函数
// let getArray:<T>(arg:T, times:number) => T[];
// getArray = (arg:any, times:number) => {
//     return new Array(times).fill(arg);
// }

// console.log(getArray(123, 3)); // [ 123, 123, 123 ]

// 泛型类型
// type GetArray = ;
// // 定义函数getArray为GetArray类型
// let getArray:GetArray = (arg:any, times:number) => {
//     return new Array(times).fill(arg);
// }

// 泛型约束
// interface ValueWithLength {
//     length:number
// }
// const getArray = <T extends ValueWithLength>(arg:T, times:number):T[] => {
//     return new Array(times).fill(arg);
// }

// console.log(getArray([1, 2], 3)); // [ [ 1, 2 ], [ 1, 2 ], [ 1, 2 ] ]
// console.log(getArray(123, 3)); // 报错，数字123不具备length属性

const getProps = <T, K extends keyof T>(obj:T, propName:K) => {
    return obj[propName];
}
const objs = {
    name: 'lisi',
    age: 12
}
console.log(getProps(objs, 'name'));
console.log(getProps(objs, 'sex')); // 报错，objs上没有sex属性