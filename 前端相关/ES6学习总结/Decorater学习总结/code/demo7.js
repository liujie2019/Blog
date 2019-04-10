function decoratorGenerator (keys, symbol) {
    return fn => (target, name, descriptor) => {
        console.log(name);
        if (!target[symbol]) {
            target[symbol] = [];
        }
        target[symbol].push({
            [keys]: fn,
            key
        });
    }
}

let viewOn = decoratorGenerator('event', Symbol('test'));

class Math {
    @viewOn('111')
    add(e) {
        console.log(123);
    }
}

const math = new Math();
math.add();