class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

// @log装饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的
function log(target, name, descriptor) {
    console.log(target); // Math {}
//   console.log(descriptor);
//   console.log(descriptor.value);
  const oldValue = descriptor.value;
  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    // apply的第二个参数可以是数组或者类数组
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}

const math = new Math();
console.log(math.add(2, 4));
