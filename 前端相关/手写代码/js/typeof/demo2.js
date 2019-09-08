let a = {
    valueOf() {
      return 1;
    },
    toString() {
      return '21';
    },
}
console.log('1' + a); // 3

// let a = {
//     valueOf() {
//       return 0;
//     },
//     toString() {
//       return '1';
//     },
//     [Symbol.toPrimitive]() {
//       return 2;
//     }
// };
// console.log(1 + a); // 3