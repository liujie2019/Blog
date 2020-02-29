class Persons {
    // public name:string; // 公有属性
    private name:string; // 私有有属性
    constructor(name:string) {
        this.name = name;
    }
    run():string {
        return `${this.name}在运动`;
    }
}
const person = new Persons('lisi');
console.log(person.name); // 报错
console.log(person.run()); // lisi在吃饭
class Man extends Persons {
    constructor(name:string) {
        super(name);
    }
    eat():string {
        return `${this.name}在吃饭`; // 报错
    }
}

const man = new Man('男人');
// 先在子类自己中找对应的属性和方法，找不到再去父类中找
console.log(man.run()); // 男人在运动
console.log(man.eat()); // 男人在吃饭
console.log(man.name); // 报错