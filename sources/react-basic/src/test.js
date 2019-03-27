const arr1 = [
    ['沐', 7],
    ['清', 11],
    ['依', 8],
    ['浓', 9],
    ['润', 10],
    ['佳', 8],
    ['学', 8],
    ['洳', 9],
    ['苏', 7],
    ['萁', 11],
    ['芸', 7],
    ['亦', 6],
    ['葵', 12],
    ['安', 6],
    ['渝', 12]
];
function fn() {
    const res = [];
    console.log(arr1);
    for(let i = 0, len = arr1.length; i < len; i++) {
        for(let j = 0; j < arr1.length - i - 1; j++) {
            const a = arr1[i];
            const b = arr1[j];
            console.log(a, b);
            if (a[1] + b[1] === 18) {
                res.push(a[0] + b[0]);
            }
        }
    }
    return res;
}
console.log(fn());