/*
 * 函数调用后不会被立即执行，之后连续delay时间段没有调用才会执行
 * 用法：用户输入校验
*/
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer); // 如果在定时器未执行期间又被调用 该定时器将被清除 并重新等待 delay 秒
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

// function debounce(fn, delay) {
//     let timer = null;
//     return function() {
//         if (timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             fn(...arguments);
//         }, delay);
//     }
// }

function throttle(fn, delay) {
    let flag = false;
    return function() {
        if (!flag) {
           setTimeout(() => {
                fn(...arguments);
                flag = false;
            }, delay);
            flag = true;
        }
    };
}