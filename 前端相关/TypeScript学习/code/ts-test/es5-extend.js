function Parent(name, age) {
    this.name = 'lisi';
    this.age = 12;
}

Parent.prototype.getName = function() {
    console.log(this.name);
}

function Child() {}

// Child.prototype = Object.create(Parent.prototype);
Child.prototype = new Parent();
const c = new Child();
console.log(c);