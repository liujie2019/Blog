const arr = [12, 6, 23, 4, 36, 18];

function selectSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            minIndex = arr[j] <= arr[minIndex] ? j : minIndex;
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

console.log(selectSort(arr));