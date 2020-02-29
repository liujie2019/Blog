function throttle(fn, delay = 250) {
    if(!fn instanceof Function) {
         throw new TypeError('Expected a function');
    }
    let preTime = Date.now();
    let timer = null;
    return function(...args) {
        let curTime = Date.now();
        if (preTime + delay > curTime) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, delay);
                preTime = curTime;
            }, delay);
        } else {
            fn.apply(this, delay);
            preTime = curTime;
        }
    }
}