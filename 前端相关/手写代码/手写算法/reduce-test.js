const arr = [{name: 'lisi', age: 12}, {name: 'wangwu', age: 18}];

function tranverse(arr) {
    let res = {};
    arr.reduce((accu, cur) => {
        let {name} = cur;
        res[name] = cur;
    }, res);
    return res;
}

console.log(tranverse(arr));


function before(n, fn) {
    let count = 0;
    return function(...args) {
        if (++count <= n) {
            return fn.apply(this, args);
        }
    }
}