// 一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果

function add (x, y, cb) {
    console.log(1);
    setTimeout(() => {
        const res = x + y;
        cb(res);
    }, 1000);
}

add(10, 20, (data) => {
    console.log(data);
});