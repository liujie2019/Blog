const arr = Array.from({length: 70}, (k, v) => v + 1);

const res = [];
let temp = [];
let count = 0;

arr.reduce((pre, cur) => {
    if (count === 10) {
        res.push(temp);
        temp = [];
        count = 0;
    }
    temp.push(cur);
    count++;
}, 0);

res.push(temp);

console.log(res);