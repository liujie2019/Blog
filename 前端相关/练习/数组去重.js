/*
* 1. 创建一个新数组，把原数组中的第一个元素插入到新数组中
* 2. 遍历原数组中的每一个元素分别和新数组中的每一个元素进行比较
*/
const arr = [1, 2, 3, 3, 21, 2, 11, 21, 1];
const newArr = [arr[0]];
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
        // 当原数组中的值已经在新数组中存在时，就没有必要再继续比较了，跳出内循环
        if (newArr[j] === arr[i]) {
            break;
        }
        // 拿原数组中的某个元素比较到新数组中的最后一个元素还没有重复
        if (j === newArr.length - 1) {
            // 将数据插入新数组
            newArr.push(arr[i]);
        }
    }
}
console.log(newArr);