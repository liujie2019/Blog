/**
 * 冒泡排序思想：将数组中的当前项和后一项进行比较，如果当前项比后一项大，则两者交换顺序。
*/
const arr = [12, 6, 23, 4, 36, 18];

function bubble(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // let temp = arr[j];
                // arr[j] = arr[j + 1];
                // arr[j + 1] = temp;
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}
console.log(bubble(arr)); // [ 4, 6, 12, 18, 23, 36 ]