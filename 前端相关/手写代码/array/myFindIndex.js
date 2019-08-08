const arr = [1, 2, 3];

const res = arr.findIndex(item => item === 2);
// console.log(res); // 1

Array.prototype.myFindIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i)) {
            return i;
        }
    }
};

const res2 = arr.myFindIndex((item, index) => item === 3);
console.log(res2); // 2