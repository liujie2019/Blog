const arr = [1, 2, 3, 4];
// arr.forEach(item => {
//     console.log(item);
//     if (item === 3) {
//         return false;
//     }
// })
// arr.some(item => {
//     console.log(item);
//     if (item === 3) {
//         return true;
//     }
//     return false;
// });
arr.every(item => {
    console.log(item);
    if (item === 3) {
        return false;
    }
    return true;
});