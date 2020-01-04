const str = 'hello';
// console.log(typeof str[Symbol.iterator]); // 'function'

// const it = str[Symbol.iterator]();
// let res;
// do {
//     res = it.next();
//     console.log(res);
// } while (!res.done);
// const str = new String('hello');
// console.log(str);
const proto = Object.getPrototypeOf(str);
proto[Symbol.iterator] = function() {
    return {
        _frist: true,
        next() {
            if (this._frist) {
                this._frist = false;
                return {
                    value: 'bye',
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

console.log([...str]);
console.log(str);