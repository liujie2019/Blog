var obj = {};
obj = Object.create(Object.prototype, {
    // foo会成为所创建对象的数据属性
    foo: {
      writable:true,
      configurable:true,
      value: 'hello'
    },
    // bar会成为所创建对象的访问器属性
    bar: {
      configurable: false,
      get: function() { return 10 },
      set: function(value) {
        console.log('Setting `obj.bar` to', value);
      }
    }
  });

console.log(obj.foo);
console.log(obj.bar);