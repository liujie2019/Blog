const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];

Array.prototype.mapForEach = function(cb) {
    const arr = this;
    const res = [];
    if (!Array.isArray(arr)) {
        throw new TypeError('type error');
    }
    for (let i = 0; i < arr.length; i++) {
        res.push(cb(arr[i]));
    }
    return res;
}

const res = strArray.mapForEach(item => item.length);

console.log(res); // [ 10, 6, 3, 4, 1 ]