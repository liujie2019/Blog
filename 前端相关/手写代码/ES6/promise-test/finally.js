// Promise.prototype.myFinally = function (cb) {
//     let P = this.constructor;
//     return this.then(
//         value => P.resolve(cb()).then(() => {console.log(value)}),
//         reason => P.resolve(cb()).then(() => {throw reason})
//     );
// }
Promise.prototype.myFinally = function (cb) {
    console.log(this.constructor);
    let P = this.constructor;
    console.log(P); // [Function: Promise]
    return this.then(
        () => P.resolve(cb()),
        () => P.resolve(cb())
    );
}

Promise.resolve(123).then(value => {
    console.log(value);
}).myFinally(() => {
    console.log('自定义的方法');
});