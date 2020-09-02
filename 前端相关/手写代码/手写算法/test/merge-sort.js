
function merge(left, right) {
    let leftLen = left && left.length;
    let rightLen = right && right.length;
    let i = 0;
    let j = 0;
    let res = [];
    while(i < leftLen && j < rightLen) {
        if (left[i] > right[j]) {
            res.push(right[j++]);
        } else {
            res.push(left[i++]);
        }
    }
    while(i < leftLen) {
        res.push(left[i++]);
    }
    while(j < rightLen) {
        res.push(right[j++]);
    }
    return res;
}

function merge_sort(arr) {
    let len = arr.length;
    if (len === 1) {
        return arr;
    }
    let left = [];
    let right = [];
    let mid = Math.floor(len / 2);
    left = arr.slice(0, mid);
    right = arr.slice(mid);
    return merge(merge_sort(left), merge_sort(right));
}

console.log(merge_sort([42, 20, 17, 13, 28, 14, 2, 23, 15])); // [ 2, 13, 14, 15, 17, 20, 23, 28, 42 ]