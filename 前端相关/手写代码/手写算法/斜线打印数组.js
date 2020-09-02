const arr = [
    [1,  2,  3,  4,  5],
    [6,  7,  8,  9,  10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];

function print(arr) {
    if (!arr.length) return [];
    const res = [];
    const startI = 0; // 行
    const startJ = arr[0].length - 1; // 列
    // 以对角线为分割线，分步打印

    let i = 0;
    let j = 0;
    let leftI = 0; // 行
    let leftJ = 0; // 列
    while (leftJ < startJ) {
       i = leftI;
       j = leftJ;
       const line = [];
       while (j >= 0) {
        res.push(arr[i][j]);
        line.push(arr[i][j]);
        i++;
        j--;
       }
       leftJ++;
       console.log(line);
    }
    i = startI;
    j = startJ;
    let midLine = [];
    while(j >= 0) {
        res.push(arr[i][j]);
        midLine.push(arr[i][j]);
        i++;
        j--;
    }
    console.log(midLine);
    let rightI = startI + 1; // 从第二行开始
    let rightJ = startJ;
    while(rightI < arr.length) {
        i = rightI;
        j = rightJ;
        const rightLine = [];
        while (i < arr.length) {
            res.push(arr[i][j]);
            rightLine.push(arr[i][j]);
            i++;
            j--;
        }
        rightI++;
        console.log(rightLine);
    }
    return res;
}

print(arr);
