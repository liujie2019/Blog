function flatMap(arr, callback) {
    return arr.map(callback).flat(1);
}
const arr = [1, 2, 3]
const res = flatMap(arr, value => [value, value, value]);
console.log(res); // [1, 1, 1, 2, 2, 2, 3, 3, 3]
console.log(arr); // [1, 2, 3]