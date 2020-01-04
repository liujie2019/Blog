/**
 * 插入排序
*/

const arr = [12, 6, 23, 4, 36, 18];

function insert(arr) {
    const res = [];
    res.push(arr[0]);
    for (let i = 1; i < arr.length; i++) {
        const currentEle = arr[i];
        // 从后向前比
        for (let j = res.length - 1; j >= 0; j--) {
            if (currentEle > res[j]) {
                res.splice(j + 1, 0, currentEle);
                break;
            }
            // 上面的if语句会一直从后向前比较，直到和res中的第一项比较完
            if (j === 0) {
                // 走到这里说明，currentEle比res中的第一项还要小，直接插入到数组最前面即可
                res.unshift(currentEle);
            }
        }
    }
    return res;
}
console.log(insert(arr));
