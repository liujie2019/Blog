console.log('start');

let promise = new Promise(resolve => {
    setTimeout(() => {
      console.log('the promise fulfilled');
      resolve('hello');
    }, 1000);
});
setTimeout(() => {
    promise.then(value => {
        console.log(value);
    });
});