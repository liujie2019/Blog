const arr = [6, 4, 8];

const res = arr.findIndex(item => {
    console.log(item); // 6 4
    return item === 4;
});
console.log(res); // 1