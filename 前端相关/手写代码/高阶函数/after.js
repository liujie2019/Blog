const myAfter = (times, callback) => {
    let total = 0;
    return function (a) {
        total += a;
        if (--times === 0) {
            callback(total);
        }
    }
};

// myAfter返回一个函数，参数也是函数
let fn = myAfter(3, total => {
    console.log('myAfter', total);
});
// 解决异步问题
fn(1);
fn(2);
fn(3);