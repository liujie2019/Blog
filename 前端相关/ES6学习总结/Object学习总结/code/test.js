// const name = 'lisi';
// const person = {name}; // 等价于const person = {name: name};
// console.log(person); // { name: 'lisi' }
// function fn(m, n) {
//     return {m, n};
// }
// console.log(fn(1, 2)); // { m: 1, n: 2 }
// const person = {
//     name: 'lisi',
//     sayName() {
//         return this.name;
//     }
// }
// console.log(person.sayName()); // lisi
const cart = {
    _wheels: 4,

    get() {
      return this._wheels;
    },

    set(value) {
      if (value < this._wheels) {
        throw new Error('数值太小了！');
      }
      this._wheels = value;
    }
  };
  console.log(cart.get()); // 4
  cart.set(5);
  console.log(cart.get()); // 5