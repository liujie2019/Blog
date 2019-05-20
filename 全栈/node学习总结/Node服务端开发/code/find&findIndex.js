const arr = [1, 2, 3];

const res = arr.findIndex((item, index) => {
    return item === 2;
});

const res2 = arr.findIndex((item, index) => {
    return item === 6;
});

console.log(res); // 2
console.log(res2); // undefined

Array.prototype.myFindIndex = function (callback) {
    for(let i = 0; i < this.length; i++ ) {
        if (callback(this[i], i)) {
            return i;
        }
    }
};

const res3 = arr.myFindIndex((item, index) => {
    return item === 3;
});

console.log(res3); // 2