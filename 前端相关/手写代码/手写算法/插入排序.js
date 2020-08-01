const arr = [12, 6, 23, 4, 36, 18];

function insertSort(arr) {
    const res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        for (let j = res.length - 1; j >= 0; j--) {
            if (arr[i] > res[j]) {
                res.splice(j+1, 0, arr[i]);
                break;
            }
            if (j === 0) {
                res.unshift(arr[i]);
            }
        }
    }
    return res;
}

console.log(insertSort(arr));

function quickSort(arr) {
    if (arr.length <= 1) { // 递归出口
        return arr;
    }
    let first = arr[0];
    let left = [];
    let right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= first) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat(first, quickSort(right));
}

console.log(quickSort(arr));