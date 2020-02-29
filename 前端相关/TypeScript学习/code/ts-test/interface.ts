/*
接口的作用：在面向对象编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计中，接口起到了一种限制和规范的作用，接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。typescript中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
*/
// ts中自定义方法传入参数，对json进行约束
// function sayName(info:{name:string}):string {
//     return info.name;
// }

// console.log(sayName(111)); // 错误写法，传入的参数不是对象
// console.log(sayName({age: 12})); // 错误写法，传入的参数对象中没有name属性
// console.log(sayName({name: 'lisi'})); // 正确写法

// // 对批量方法传入参数进行约束
// // 接口：行为和动作的规范，对批量方法进行约束

// // 就是传入对象的约束 属性接口
// interface FullName {
//     firstName:string; // 约束
//     secondName:string;
// }
// // 约束firstName和secondName是必传参数
// // 必须传入对象参数
// function sayName(name:FullName) {
//     console.log(name.firstName + '---' + name.secondName + '---' + name.age);
// }
// let obj = {
//     firstName: 'li',
//     secondName: 'si',
//     age: 12
// };
// // 传入的参数必须包含firstName和secondName
// sayName(obj);

// 对批量方法传入参数进行约束
// 接口：行为和动作的规范，对批量方法进行约束

// 就是传入对象的约束 属性接口
// interface FullName {
//     firstName:string; // 约束
//     secondName?:string; // 可选参数
// }
// // 约束firstName和secondName是必传参数
// // 必须传入对象参数
// function sayName(name:FullName) {
//     console.log(name.firstName);
// }
// // 参数顺序可以不一致
// let obj = {
//     firstName: 'li'
// };
// // 传入的参数必须包含firstName和secondName
// sayName(obj);

// 属性接口应用--ajax请求封装
interface Config {
    type: string,
    url: string,
    data?: string,
    dataType: string
}
function ajax(config:Config) {
    let xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (config.dataType === 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
}

ajax({
    type: 'get',
    data: 'name=lisi',
    url: 'http://www.baidu.com',
    dataType: 'json'
});