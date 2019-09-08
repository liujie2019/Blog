namespace A {
    // 命名空间内部的类和方法封闭的
    interface Animal {
        name:string;
        eat(str:string):string;
    }
    // 实现接口
    // 在外部使用需要export
    export class Dog implements Animal {
        name:string;
        constructor(name:string) {
            this.name = name;
        }
        eat():string {
            return `${this.name}吃大骨头`;
        }
    }

    export class Cat implements Animal {
        name:string;
        constructor(name:string) {
            this.name = name;
        }
        eat(food:string):string {
            return `${this.name}吃${food}`;
        }
    }

    // let cat = new Cats('xiaohua');
    // console.log(cat.eats('黄花鱼')); // xiaohua吃黄花鱼
}

let dogs = new A.Dog('xiaohuang');
console.log(dogs.eat());