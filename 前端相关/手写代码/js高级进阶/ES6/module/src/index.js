import util1 from './util1';
import {fn1, fn2} from './util2';

console.log(util1);
fn1();
fn2();

// var obj = {a: 1, b: 2};
// for (var item in obj) {
//     // console.log(item);
// }
// console.log(item); // b

var obj = {a: 1, b: 2};
for (let item in obj) {
    console.log(item);
}
console.log(item); // ReferenceError: item is not defined