Array.prototype.myFind = function(cb) {
    const {length} = this;
    for (let i = 0; i < length; i++) {
        if (cb(this[i])) {
            return this[i];
        }
    }
    // 找不到则返回undefined
    return;
}

const arr = [1, 2, 3, 4];
const target = arr.myFind(item => {
    return item === 3;
});
console.log(target); // 3