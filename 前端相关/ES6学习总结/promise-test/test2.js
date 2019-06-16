var p1 = new Promise((resolve, reject) => {
    resolve('成功');
});
const f2 = () => {
    return 'test';
}
p1.then(() => {
    f2();
}).then(
    (value) => {
        console.log(value);
    }
);