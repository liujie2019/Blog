/*
 * 节流函数 限制函数在指定时间段只能被调用一次
 * 用法 比如防止用户连续执行一个耗时操作 对操作按钮点击函数进行节流处理
*/

function throttle(fn, delay) {
    let timer = null;
    return function(...args) {
        if (!timer) {
            fn(...args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }
    }
}