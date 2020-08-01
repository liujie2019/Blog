
const p = new Promise((resolve, reject) => {
    // throw Error('test');
    resolve(11);
});

p.then(data => {
    console.log(data);
    throw Error('test');
}, err => {
    console.log('err11', err);
}).catch(err => {
    console.log('catch22', err);
});


const p = new Promise((resolve, reject) => {
    throw Error('test');
    // resolve(11);
});

p.then(data => {
    console.log(data);
}).catch(err => {
    console.log('catch22', err);
});