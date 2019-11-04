class Parent {
    constructor() {
        this.name = 'lisi';
        console.log(new.target); // 指向当前的class Parent
        console.log(new.target === Parent); // true
        console.log(new.target.name);
    }
}

new Parent(); // Parent
