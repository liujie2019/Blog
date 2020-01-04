const sum = () => {
    return [...arguments].reduce((pre, cur) => {
        return pre + cur;
    }, 0);
}

const res = sum(1, 2, 3); // Uncaught ReferenceError: arguments is not defined
console.log(res);

const sum = function() {
    return [...arguments].reduce((pre, cur) => {
        return pre + cur;
    }, 0);
}

const res = sum(1, 2, 3); // Uncaught ReferenceError: arguments is not defined
console.log(res); // 6

const sum = (...args) => {
    // console.log(args); // [1, 2, 3]
    return args.reduce((pre, cur) => {
        return pre + cur;
    }, 0);
}

const res = sum(1, 2, 3);
console.log(res);