// var a = {
//     count: 0,
//     toString() {
//         return ++this.count;
//     }
// };
// if (a == 1 && a == 2 && a == 3) {
//     console.log(666);
// }

// var a = 0;

// Object.defineProperty(window, 'a', {
//     get() {
//         return ++a;
//     }
// });
// if (a == 1 && a == 2 && a == 3) {
//     console.log(666);
// }

var a = [1, 2, 3];

a.toString = a.shift;

if (a == 1 && a == 2 && a == 3) {
    console.log(666);
}