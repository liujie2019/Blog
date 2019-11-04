const arr = [1, 2, 3];
for (let key in arr) {
    console.log(key, typeof key); // key是字符串类型
    // console.log(arr[key]);
}
// for (let i of arr) {
//     if (i === 3) {
//         // continue;
//         // break;
//         return;
//     }
//     console.log(i); // 1, 2
// }