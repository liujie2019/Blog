function log(target, name, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this, arguments);
    };
    return descriptor;
}
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

const math = new Math();
math.add(1, 2);