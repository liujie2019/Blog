/**
 * add(1)(2,3)(4, 5).value() => 10
*/

// function add(...args) {
//     let fn = (...innerArgs) => {
//         return add.apply(this, args.concat(innerArgs));
//     }
//     fn.value = () => {
//         return args.reduce((pre, cur) => {
//             return pre + cur;
//         });
//     }
//     return fn;
// }

// console.log(add(1)(2,3)(4, 5).value());


function add (a, b, c, d, e) {
    return a + b + c + d + e;
}

function curry(fn, ...outerArgs) {
    return function(...innerArgs) {
        const args = [...outerArgs, ...innerArgs];
        if (fn.length <= args.length) {
            return fn.apply(this, args);
        } else {
            return curry(fn, ...args);
        }
    }
}

const curryAdd = curry(add);

console.log(curryAdd(1)(2,3)(4, 5));