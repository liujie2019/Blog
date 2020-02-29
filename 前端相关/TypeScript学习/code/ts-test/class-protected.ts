class Person1 {
    public name:string;
    protected age:number;
    private sex:string;
    constructor(name:string, age:number, sex:string) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    public sayName():string {
        return `我叫${this.name}`;
    }
    public sayAge():string {
        // 受保护属性age能在类内访问
        return `我今年${this.age}岁`;
    }
}

const person1 = new Person1('lisi', 12, '男');
console.log(person1.name);
console.log(person1.age); // 报错，受保护属性只能在类内和子类中访问
console.log(person1.sex); // 报错，私有属性只能在类内访问
console.log(person1.sayName());
console.log(person1.sayAge());

class Man1 extends Person1 {
    constructor(name:string, age:number, sex:string) {
        super(name, age, sex);
    }
    public childSayAge():string {
        // 受保护属性age能在子类中访问
        return `我今年${this.age}岁了`;
    }
}
const man1 = new Man1('男人', 13, '男');
console.log(man1.name);
console.log(man1.age); // 报错，受保护属性只能在类内和子类中访问
console.log(man1.sex); // 报错，私有属性只能在类内访问
console.log(man1.sayName());
console.log(man1.sayAge());
console.log(man1.childSayAge());
