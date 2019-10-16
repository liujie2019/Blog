/**
 * call和apply的区别是什么，哪个性能更好一些？
 * */
// const arr = [1, 2, 3];
// const obj = {};
// function fn(a, b, c) {}
// fn.apply(obj, arr); // a = 1 b = 2 c = 3
// fn.call(obj, ...arr); // 可以实现类似apply的效果

// console.time('for');
// for(let i = 0; i < 1000; i++){

// }
// console.timeEnd('for'); // for: 0.071ms