Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        err => P.resolve(callback()).then(() => {throw err;})
    );
};

const p1 = new Promise((resolve, reject) => {
    resolve(1233);
});

p1.then(data => {
    return data;
}).catch(err => {
    console.log(err);
}).finally(() => {
    console.log(12);
});
