// var arr = [1, 2, 3]; // es5定义数组方式

// ts定义数组，方式1
let arr:number[] = [1, 2, 3];
console.log(arr);
// ts定义数组，方式2
let arr2:Array<number> = [2, 3, 4];
console.log(arr2);

let sdf:undefined;
// sdf = 123;
// let sdf:number;
// console.log(sdf); // 报错
let asd:null;
asd = null;
// asd = 123;
// asd = undefined;

function run123():undefined {
    console.log(111);
    // 定义返回值为undefined，必须显式返回undefined
    return undefined;
}