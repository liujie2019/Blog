class Parent {
    name:string;
    age:number;
    skill:string;
    constructor(name:string, age:number, skill:string) {
        this.name = name;
        this.age = age;
        this.skill = skill;
    }
    sayName():string {
        return `我叫${this.name}`;
    }
}

class Child extends Parent {
    public xingxiang:string = '很帅';
    public work() {
        console.log('我热爱工作');
    }
    public sayName():string {
        console.log(super.sayName()); // 我叫lisi
        return '我是子类的方法';
    }
}

const child = new Child('lisi', 12, '编程');
console.log(child.sayName()); // 我是子类的方法
child.work(); // 我热爱工作