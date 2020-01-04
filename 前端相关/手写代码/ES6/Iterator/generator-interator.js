const obj = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};

const obj = {
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 33;
    }
};

console.log([...obj]); // [ 1, 2, 3 ]

const obj = {
    name: 'lisi',
    age: 12
};

// for (let key of Object.keys(obj)) {
//     console.log(key, obj[key]);
// }

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

for (let [key, value] of entries(obj)) {
    console.log(key, value);
}
