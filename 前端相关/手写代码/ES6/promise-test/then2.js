const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'p1 done');
});

// 这里使用then方法依次指定了两个回调函数。
// 第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
p1.then(data => {
    console.log(data); // p1 done
    return `${data}11`;
}).then(data => {
    console.log(data); // p1 done11
});