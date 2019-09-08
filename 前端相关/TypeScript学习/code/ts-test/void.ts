// 表示run方法没有返回值
// function run():void {
//     console.log(111);
// }
// 指定为undefined表示该方法返回undefined
// function run():undefined {
//     console.log(111);
//     return undefined;
// }

// let unusable: void = undefined;
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);