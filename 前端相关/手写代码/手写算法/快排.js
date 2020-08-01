const arr = [12, 6, 23, 1, 4, 36, 18];

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[0]) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return [...quickSort(left), arr[0], ...quickSort(right)];
}

console.log(quickSort(arr));