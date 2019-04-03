function nonenumerable(target, name, descriptor) {
    descriptor.enumerable = false;
    return descriptor;
}

class Person {
    @nonenumerable
    getKidCount() {
        return this.children.length;
    }
}