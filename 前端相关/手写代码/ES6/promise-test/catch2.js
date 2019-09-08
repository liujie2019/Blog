const promise = new Promise(function (resolve, reject) {
    try {
        throw new Error('test');
    } catch (e) {
        console.log(e);
        reject(e);
    }
});
promise.catch(function (error) {
    console.log(error);
});