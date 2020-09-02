const arr = [1, 2, 3, [4, 5, [6, [7, 8]]]];

// function myFlat(arr) {
//     let res = [];
//     arr.forEach(el => {
//         if (Array.isArray(el)) {
//             res = res.concat(myFlat(el)); // 递归
//         } else {
//             res.push(el);
//         }
//     });
//     return res;
// }

function myFlat(arr) {
    let res = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res = [...res, ...myFlat(item)];
        } else {
            res.push(item);
        }
    });
    return res;
}

console.log(myFlat(arr)); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

Function.prototype.a = () => {console.log('a')};
Object.prototype.b = () => {console.log('b')};

function A() {

}

const a = new A();
// a.a();
a.b();