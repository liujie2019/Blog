var age: number = 123;
console.log(age);
// 字符串
var str: string = '123';
// 布尔值
var a: boolean = true;
// 定义数组
// 方式1
var arr: number[] = [1, 2, 3];
console.log(arr);
// 方式2 使用数组泛型，Array<元素类型>
var arr2: Array<number> = [1, 3, 5];
console.log(arr2);
// null 和 undefined
let n: null = null;

let test2:undefined;
console.log(test2);

// 枚举
// 默认情况从0开始为元素编号，也可手动为1开始
enum Color {Red=1, Green, Blue}
let c: Color = Color.Blue;
console.log(c); // 3
let colorName: string = Color[2];
console.log(colorName); // Green
enum Gender {nan = '男', nv = '女'}
console.log(Gender.nv);
// 元组
const tuple: [number, string, boolean] = [24, 'abc', true];
// any
let t: any = 100;
t = '字符串';
console.log(t);

// any类型的使用场景
const box:any = document.querySelector('.box');
box.style.color = 'red';