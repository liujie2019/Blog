const getData = () => new Promise((resovle, reject) => {
    setTimeout(() => {
        resovle('data');
    }, 1000);
});
Promise.resolve(getData()).then(data => console.log(data));