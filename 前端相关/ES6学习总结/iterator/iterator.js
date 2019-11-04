const obj = {
    [Symbol.iterator]() {
        return {
            next() {
                return {
                    value: 1,
                    done: true
                }
            }
        }
    }
};

console.log(obj);
console.log(obj[Symbol.iterator]());