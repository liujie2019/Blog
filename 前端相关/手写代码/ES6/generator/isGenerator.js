function* read() {
    const name = yield fs.readFile('name.txt', 'utf8');
    const age = yield fs.readFile('age.txt', 'utf8');
    const a = yield [1, 2, 3, 4, 5];
    return age + a;
}

function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}
function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    console.log(constructor); // [Function: GeneratorFunction]
    if (!constructor) return false;
    console.log('GeneratorFunction' === constructor.name); // true
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

console.log(read); // [GeneratorFunction: read]
console.log(isGeneratorFunction(read)); // true
console.log(isGenerator(read())); // true
