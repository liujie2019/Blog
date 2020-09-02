const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

// Array.prototype.shuffle = function() {
//     const res = this;
//     for (let i = arr.length; i; i--) {
//         // 核心思想，遍历数组元素，在前i项中随机取一项，与第i项交换
//         let j = Math.floor(Math.random() * i); // j是小于i的
//         [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
//     }
//     return res;
// }

Array.prototype.shuffle = function() {
    let arr = this;
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i); // 随机下标
        [arr[i-1], arr[j]] = [arr[j], arr[i-1]];
    }
    return arr;
}
console.log(arr.shuffle()); // [ 4, 8, 5, 7, 3, 6, 2, 1 ]