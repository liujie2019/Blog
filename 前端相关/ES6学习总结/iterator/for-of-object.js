function makeIterator() {
    const that = this;
    let nextIndex = 0;
    const keys = Object.keys(that);
    console.log('使用自己的封装的迭代器');
    return {
        next() {
            const done = keys.length === nextIndex;
            const currentKey = keys[nextIndex++];
            const value = done ? undefined : that[currentKey];
            return {
                value,
                done
            };
        }
    }
}

Object.prototype[Symbol.iterator] = makeIterator;
const obj = {
    name: 'lisi',
    age: 12
};
console.log(obj);

for (let i of obj) {
    console.log(i);
}