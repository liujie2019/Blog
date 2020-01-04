/**
 * 快速排序：基于递归实现
*/

const arr = [12, 6, 23, 4, 36, 18];

function quick(arr) {
    // 第四步：结束递归(当arr中小于等于一项，则不用继续递归处理)
    if (arr.length <= 1) {
        return arr;
    }
    // 第一步：找到数组的中间项，并在原数组中将其移除
    const middleIndex = Math.floor(arr.length / 2); // 向下取整
    const [middleValue] = arr.splice(middleIndex, 1);
    // 第二步：准备左右两个数组，循环数组中剩余的项，比中间项小的放到左数组中，反之放到右数组中
    const leftArr = [];
    const rightArr = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        item < middleValue ? leftArr.push(item) : rightArr.push(item);
    }
    // 第三步：采用递归让左右两边的数组继续这样处理，直到左右两边都排好序
    return quick(leftArr).concat(middleValue, quick(rightArr));
}

console.log(quick(arr));
