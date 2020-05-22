// function forEach(arr, callback) {
//     const {length} = arr;
//     for (let i = 0; i < length; i++) {
//         const item = arr[i];
//         callback(item, i, arr);
//     }
// }

// forEach([1, 2], (item, index, arr) => {
//     console.log(item, index);
// });

Array.prototype.myForEach = function(cb) {
    if(!Array.isArray(this)) {
        return 'TypeError';
    }
    const {length} = this;
    for (let i = 0; i < length; i++) {
        cb(this[i], i, this);
    }
}
const arr = [1, 2];
arr.myForEach((item, i, arr) => {
    console.log(item, i, arr);
});