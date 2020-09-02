// 将传入的两个数组进行排序
function merge(left, right) {
    let leftLen = left && left.length;
    let rightLen = right && right.length;
    let res = [];
    // 定义两个指针，分别指向两个数组的头，从头开始依次遍历
    let i = 0;
    let j = 0;
    while(i < leftLen && j < rightLen) {
        if (left[i] < right[j]) {
            res.push(left[i++]);
        } else {
            res.push(right[j++]);
        }
    }
    while(i < leftLen) {
        res.push(left[i++]);
    }
    while(j < rightLen) {
        res.push(right[j++]);
    }
    // 返回排好序的数组
    return res;
}

function merge_sort(arr) {
    let len = arr.length;
    // 如果只有一个元素，则不需要排序了，直接返回原数组即可
    if (len === 1) {
        return arr;
    }
    let left = [];
    let right = [];
    let mid = Math.floor(len / 2);
    // 分为左右两部分
    left = arr.slice(0, mid);
    right = arr.slice(mid);
    // 递归
    return merge(merge_sort(left), merge_sort(right));
}

console.log(merge_sort([42, 20, 17, 13, 28, 14, 2, 23, 15])); // [ 2, 13, 14, 15, 17, 20, 23, 28, 42 ]