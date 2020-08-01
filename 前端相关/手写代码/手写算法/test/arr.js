const arr = Array.from({length: 70}, (k, v) => v + 1);

let temp = [];
let res = [];
arr.reduce((prev, cur, index) => {
    if (temp.length === 10) {
        res.push([...temp]);
        temp = [];
    }
    temp.push(cur);
}, 0);

res.push(temp);

console.log(res);