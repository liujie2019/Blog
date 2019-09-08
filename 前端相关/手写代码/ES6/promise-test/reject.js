setTimeout(() => {
    console.log('3');
}, 0);

Promise.reject('2').catch(err => {
    console.log('err:', err);
});

console.log('1');