class Animal {
    constructor() {

    }
}

function *gen() {
    yield 1;
}

console.log(gen().next());