Array.prototype.myFindIndex = function(cb) {
    const {length} = this;
    for (let i = 0; i < length; i++) {
        if (cb(this[i])) {
            return i;
        }
    }
    return -1;
}

const arr = [1, 2, 3, 4];
const index = arr.myFindIndex(item => {
    return item === 3;
});
console.log(index); // 2