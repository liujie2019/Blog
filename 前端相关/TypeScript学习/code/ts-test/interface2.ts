// 函数类型接口

// 加密的函数类型接口
// interface encrypt {
//     // 接收两个string类型参数key和value，返回值也是string类型
//     (key:string, value:string):string;
// }
// // md5方法必须遵循encrypt接口规范
// let md5:encrypt = function(key:string, value:string):string {
//     // 模拟md5操作
//     return key + value;
// }
// console.log(md5('name', 'lisi'));

// 可索引接口
// interface UserArr {
//     // 定义了索引是数字，值是字符串的数组接口
//     [index:number]:string
// }

// let arr22:UserArr = ['111', '222'];

// interface UserObj {
//     // 定义了索引是数字，值是字符串的对象接口
//     [index:string]:string
// }

// let obj22:UserObj = {name: 'lisi'};

// 类类型接口
interface Animals {
    name:string;
    eats(str:string):string;
}
// 实现接口
class Dogs implements Animals {
    name:string;
    constructor(name:string) {
        this.name = name;
    }
    eats():string {
        return this.name;
    }
}

let dog2 = new Dogs('xiaohuang');
console.log(dog2.eats());

class Cats implements Animals {
    name:string;
    constructor(name:string) {
        this.name = name;
    }
    eats(food:string):string {
        return `${this.name}吃${food}`;
    }
}

let cat = new Cats('xiaohua');
console.log(cat.eats('黄花鱼')); // xiaohua吃黄花鱼