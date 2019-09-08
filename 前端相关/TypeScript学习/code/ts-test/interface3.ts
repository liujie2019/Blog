// 接口扩展，接口可以继承接口

// interface Animal2 {
//     eats():string;
// }

// interface Person2 extends Animal2 {
//     work():string;
// }

// class Woman implements Person2 {
//     public name:string;
//     constructor(name:string) {
//         this.name = name;
//     }
//     eats():string {
//         return `${this.name}爱吃米饭`;
//     }
//     work():string {
//         return `${this.name}爱工作`;
//     }
// }

// let woman = new Woman('lisi');
// console.log(woman.eats());
// console.log(woman.work());

// 接口扩展，接口可以继承接口

interface Animal2 {
    eats():string;
}

interface Person2 extends Animal2 {
    work():string;
}

class Programmer {
    public name:string;
    constructor(name:string) {
        this.name = name;
    }
    coding():string {
        return `${this.name}爱写代码`;
    }
}

// 继承类并实现接口
class Woman extends Programmer implements Person2 {
    constructor(name:string) {
        super(name);
    }
    eats():string {
        return `${this.name}爱吃米饭`;
    }
    work():string {
        return `${this.name}爱工作`;
    }
}

let woman = new Woman('lisi');
console.log(woman.coding());
console.log(woman.eats());
console.log(woman.work());