const isInclude = [1, 2, 32].includes(2);
const p = new Promise(() => {});
async function say () {
    await 1;
    console.log(666);
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    say() {
        return this.name;
    }
}