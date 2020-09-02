let arr = [[1, 2], [3, 4], [4, 7], [6, 20]];

function merge(arr) {
    // 先排序
    arr.sort((a, b) => a[0] - b[0]);
    let res = [arr[0]];
    arr = arr.slice(1);
    for (let i = 0; i < arr.length; i++) {
        let len = res.length;
        // 判断是否存在交集
        if (res[len - 1][1] >= arr[i][0]) {
            // 更新右边界
            res[len - 1][1] = Math.max(res[len - 1][1], arr[i][1]);
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(merge(arr)); // [ [ 1, 2 ], [ 3, 20 ] ]