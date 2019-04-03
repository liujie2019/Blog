// Set值的增删查
// 追加add：

// 在使用Array的时候，可以用push进行追加值，那Set稍有不同，它用更语义化的add进行追加。

const setArr = new Set(['123', 'test', 'web', 'test']);
console.log(setArr); //Set { '123', 'test', 'web' }

setArr.add('es6');
console.log(setArr); // Set { '123', 'test', 'web', 'es6' }

setArr.delete('123');
console.log(setArr); // Set { test', 'web', 'es6' }