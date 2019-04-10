class Math {
    @log
    add(a, b) {
      return a + b;
    }
  }

  function log(target, name, descriptor) {
    // console.log(descriptor);
    console.log(descriptor.value);
    const oldValue = descriptor.value;
    descriptor.value = function() {
      console.log(`Calling ${name} with`, arguments);
      return oldValue.apply(this, arguments);
    };
    return descriptor;
  }

  const math = new Math();
 console.log( math.add(2, 4));