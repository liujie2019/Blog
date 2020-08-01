const obj = {
    name: 'lisi',
    age: 12,
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                // 获取所有的key
                const keys = Object.keys(self);
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
};

for (let i of obj) {
    console.log(i);
}

const str = 'abc';
const it = str[Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

/**
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: 'c', done: false }
{ value: undefined, done: true }
*/