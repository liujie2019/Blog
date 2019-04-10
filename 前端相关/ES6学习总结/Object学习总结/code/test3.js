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
console.log(cart.get());
cart.set(6);
console.log(cart.get());