console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
    resolve('hello');
    }, 2000);
    }).then(value => {
    console.log(value);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('world');
        }, 2000);
    });
}).then(value => { //两个then依次执行，value=上一个then的resolve的回调world
   console.log(value + ' world');
});
