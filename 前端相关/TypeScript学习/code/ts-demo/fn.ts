function fn(num: number):string {
    return `找到了${num}`;
}
let num: number = 2;
let res:string = fn(num);
console.log(res);

// 可选参数的函数
function test(name: string, age?: number):string {
    let res: string = '';
    res = `找到了${name}`;
    if (age) {
        res += age;
    }
    return `${res}同学`;
}
console.log(test('lisi'));
console.log(test('lisi', 20));