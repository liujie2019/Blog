Function.prototype.before = function(cb) {
    const that = this;
    return function(...arguments) { // 剩余运算符，将形参转为数组
        cb();
        console.log(arguments); // [ 1, 2 ]
        that(...arguments); // 展开运算符，将数组元素展开作为形参
    }
}

const fn = (a, b) => {
    console.log(a, b); // 1, 2
    console.log('fn called');
}

const newFn = fn.before(() => {
    console.log('我先执行');
});

newFn(1, 2);

/*
我先执行
[ 1, 2 ]
1 2
fn called
*/