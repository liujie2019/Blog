var p1 = new Promise((resolve, reject) => {
    resolve('成功');
});
const f2 = () => {
    return 'test';
}
const f3 = (value) => {
    console.log(value);
};
p1.then(f2()).then(f3);