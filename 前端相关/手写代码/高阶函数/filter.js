const arr = [1, 2, 3, 2, 3, 1, 4, 4, 5, 5];
// const arr2 = [];

// for (let i = 0; i < arr.length; i++) {
//     if (arr.indexOf(arr[i]) === i) {
//         arr2.push(arr[i]);
//     }
// }

const arr2 = arr.filter((item, index, sourceArray) => {
    if (sourceArray.indexOf(item) === index) {
        return item;
    }
});
console.log(arr); // [ 1, 2, 3, 2, 3, 1, 4, 4, 5, 5 ]
console.log(arr2); // [ 1, 2, 3, 4, 5 ]