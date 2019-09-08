
// 函数类型接口
// interface ConfigFn {
//     (value1:string, value2:string):string;
// }

// let setData:ConfigFn = function(value1:string, value2:string):string {
//     return value1 + value2;
// }

// console.log(setData('1', 'a'));

// 泛型接口
// // 方法1
// interface ConfigFn {
//     <T>(value1:T):T;
// }

// let getData:ConfigFn = function<T>(value:T):T {
//     return value;
// }

// console.log(getData<string>('a'));

// 方法2
interface ConfigFn<T> {
    (value1:T):T;
}

function getData<T>(value:T) {
    return value;
}

let myGetData:ConfigFn<string> = getData;

console.log(getData<string>('aaa'));