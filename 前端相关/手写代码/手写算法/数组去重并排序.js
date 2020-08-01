const arr1 = [1, 2, 2, 3, 4, 5, 5, 7, 8, 8];
const arr2 = [2, 3, 3, 6, 6];

function fn(arr1, arr2) {
    // 先去重合并
    const arr = Array.from(new Set([...arr1, ...arr2]));
    let res = [arr[0]];
    // 再插入排序
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
    console.log(res);
    return res;
}

fn(arr1, arr2);