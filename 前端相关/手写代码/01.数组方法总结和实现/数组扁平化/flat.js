const arr = [1, 2, 3, [4, 5, [6, [7, 8]]]];

function myFlat(arr) {
    let res = [];
    arr.forEach(el => {
        if (Array.isArray(el)) {
            res = res.concat(myFlat(el)); // 递归
        } else {
            res.push(el);
        }
    });
    return res;
}

console.log(myFlat(arr)); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]