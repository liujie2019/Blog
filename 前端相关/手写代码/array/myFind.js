const arr = [1, 2, 3];

const res = arr.find(item => item === 2);
// console.log(res); // 2

Array.prototype.myFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i)) {
            return this[i];
        }
    }
};

const res2 = arr.myFind((item, index) => item === 3);
console.log(res2); // 3