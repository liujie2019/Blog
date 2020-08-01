const duplicatedsArr = [1, 5, 6, 5, 7, 1, 6, 8, 9, 7];

const res = duplicatedsArr.reduce((prev, cur) => {
    if (!prev.includes(cur)) {
        prev.push(cur);
    }
    return prev;
}, []);

console.log(res);