const arr = [12, 6, 23, 4, 36, 18];

function selectSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i; // 保存最小元素索引
        // 从当前索引后的第一个元素开始向后扫描，找到最小的元素索引
        for (let j = i + 1; j < len; j++) {
            minIndex = arr[j] <= arr[minIndex] ? j : minIndex;
        }
        // 如果最小元素索引与当前元素索引不一致，则交换两个元素位置
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

console.log(selectSort(arr));