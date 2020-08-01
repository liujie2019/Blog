console.log('start');

// 2秒后被放入到任务队列中
setTimeout(() => {
    console.log(1);
}, 2000);

Promise.resolve(3).then(data => {
    console.log(data);
}).then(() => {
    console.log(4)
});

// 1秒后被放入到任务队列中
// 任务队列中的排序是按放入的顺序依次执行的
setTimeout(() => {
    console.log(2);
}, 1000);

console.log('end');
/*
输出结果：
start end 3 4 2 1
*/