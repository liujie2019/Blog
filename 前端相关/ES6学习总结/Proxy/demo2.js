const obj = new Proxy({}, {
    get: (target, key, receiver) => {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set: (target, key, value, receiver) => {
      console.log(target);
      console.log(key);
      console.log(value);
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
});
obj.count = 1;
++obj.count;