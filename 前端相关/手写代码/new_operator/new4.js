function Animal(name) {
    this.name = name;
    // return null;
    // return undefined;
    // return 12;
    // return 'aaa';
    // return true;
    // return Symbol();

    // return function() {}; // [Function]
    // return [1, 2, 3]; // [1, 2, 3]
    // return new Date(); // 2019-07-16T12:47:18.228Z
    // return /\s/g; // /\s/g
    // return new Error(); // Error
    return new Object(); // {}
}

let animal = new Animal('小花');
console.log(animal);