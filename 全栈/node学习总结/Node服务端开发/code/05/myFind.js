const arr = [1, 2, 3];

// console.log(arr.find(item => item === 3)); // 3

// Array.prototype.myFind = function(fn) {
//     for (let i = 0; i < this.length; i++) {
//         if (fn(this[i], i)) {
//             return this[i];
//         }
//     }
// }

// const res = arr.myFind((item, index) => item === 2);
// console.log(res);

Array.prototype.myFindIndex = function(fn) {
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i)) {
            return i;
        }
    }
}

const res = arr.myFindIndex((item, index) => item === 2);
console.log(res);
