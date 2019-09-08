const p1 = new Promise((resolve, reject) => {
    throw new Error('test');
});

p1.catch(err => {
    console.log(err); // Error: test
});