const arr = [1, 3, 5, 7, 9, 10];
const target = 7;

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const midIndex = Math.floor((left + right) / 2);
        if (arr[midIndex] > target) {
            right = midIndex - 1;
        } else if (arr[midIndex] < target) {
            left = midIndex + 1;
        } else {
            return midIndex;
        }
    }
    return -1;
}

const index = binarySearch(arr, target);
console.log(index); // 3