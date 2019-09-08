const Promise = require('./promise');

console.log(1);
new Promise((resolve, reject) => {
    console.log(2);
    // throw Error('出错了');
    setTimeout(() => {
        resolve(1);
    }, 0);
    // resolve(1);
}).then(value => {
    console.log(4);
    console.log('value', value);
}, error => {
    console.log('error', error);
});
console.log(3);