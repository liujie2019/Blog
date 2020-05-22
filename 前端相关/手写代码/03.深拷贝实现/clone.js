/**
 * 递归爆栈问题
*/
function createData(deep, breadth) {
    let data = {};
    let temp = data;
    for (let i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (let j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }
    return data;
}

// console.log(createData(1, 3)); // { data: { '0': 0, '1': 1, '2': 2 } }
// console.log(createData(2, 3)); // { data: { '0': 0, '1': 1, '2': 2, data: { '0': 0, '1': 1, '2': 2 } } }
// console.log(createData(3, 3));

function clone(source) {
    let obj = {};
    for(let key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object') {
                obj[key] = clone(source[key]); // 递归拷贝
            } else {
                obj[key] = source[key];
            }
        }
    }
    return obj;
}
let obj = {a: 1, b: {c: 2}};
let obj2 = clone(obj);

console.log(obj2);
obj2.b.c = 666;
console.log(obj2, obj); // { a: 1, b: { c: 666 } } { a: 1, b: { c: 2 } }

clone(createData(1000));
clone(createData(10000)); // RangeError: Maximum call stack size exceeded