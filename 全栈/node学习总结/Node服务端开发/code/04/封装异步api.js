function test(callback) {
    setTimeout(() => {
        const arr = [1, 2, 3];
        callback(arr);
    }, 1000);
}

test(function(data) {
    console.log(data); // [ 1, 2, 3 ]
});