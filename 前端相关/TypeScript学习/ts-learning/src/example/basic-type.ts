// 布尔类型
let bool:boolean = false;
// bool = 123;
// 数值类型
let num:number = 1323;
num = 0b1111011; // 二进制
num = 0o173; // 八进制
num = 0x7a; // 16进制

// 字符串类型
let str:string = 'abc';
console.log(`值是${num}`);

// 数组类型
// 写法1
let arr:number[];
arr = [1, 2, 3];
// 写法2
let arr2:Array<number>;
arr2 = [1, 2, 3];
// 联合类型(可以是字符串或者数字)
let arr3:(string | number)[];
arr3 = ['a', 2, 3];

// 元组类型
let tuple:[string, number, boolean];
tuple = ['a', 1, false];

// 枚举类型
enum Roles {
    SUPER_ADMIN = 1, // 赋值初始值
    ADMIN = 4,
    USER
}
// 获取到的是索引值
console.log(Roles.SUPER_ADMIN); // 1
// 也可以根据索引值获取到对应的枚举属性值
console.log(Roles[4]); // 'ADMIN'

// any类型
let a:any;
a = 1;
a = '123';
let arra:any[];
arra = [1, 'asd'];

// void类型
const fn = (str:string):void => {
    console.log(str);
    // 默认返回undefined
}
fn('test');
let kong:void;
kong = undefined;
// kong = null; // 报错，不能将null赋值给void类型

let a1:undefined;
a1 = undefined;

let b:null;
b = null;

let c:never;
c = (() => {
    throw new Error('错误');
})();
// never类型
const errorFunc = (msg:string):never => { // 定义返回值是never类型
    throw new Error(msg);
}
const infiniteFunc = ():never => { // 死循环
    while(true){}
}
// object类型
const func = (obj:object):string => {
    return `${obj}`;
}
func({name: 'lisi'});

// 类型断言
const getLength = (target:string | number):number => {
    if ((<string>target).length || (target as string).length === 0) {
        return (target as string).length;
    } else {
        return target.toString().length;
    }
}