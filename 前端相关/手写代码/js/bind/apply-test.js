const arr = [1, 2, 23, 34];
console.log(Math.max.apply(null, arr)); // 34
console.log(Math.min.apply(null, arr)); // 1

// function isArray(obj) {
//     return Object.prototype.toString.call(obj) === '[object Array]';
// }

function Parent(name, age) {
    this.name = name;
    this.age = age;
}

function Child(name, age) {
    Parent.call(this, name, age);
}