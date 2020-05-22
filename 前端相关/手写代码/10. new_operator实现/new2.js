function Animal(name) {
    console.log('赋值前的this：', this);
    this.name = name;
    console.log('赋值后的this：', this);
    return false;
}

let animal = new Animal('小花');
console.log(animal);