const str = 'hello world!';

function reverse(str) {
    let i = 0;
    let j = str.length - 1;
    // 先转为数组
    let arr = str.split('');
    while(i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
    }
    return arr.join('');
}

console.log(reverse(str)); // '!dlrow olleh'

function throttle(fn, delay) {
    let flag = true;
    return function(...args) {
        if (flag) {
            setTimeout(() => {
                fn.apply(this, args);
                flag = true;
            }, delay);
            flag = false;
        }
    }
}

const fn = () => {
    console.log(111);
}

const tFn = throttle(fn, 2000);

function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}