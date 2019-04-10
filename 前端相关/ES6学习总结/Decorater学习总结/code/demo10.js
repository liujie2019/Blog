function caculate(times) {
    let i = 0;
    while(i<times) i++;
}

// decorator
function log(fn) {
    return function (...args) {
        const start = Date.now();
        fn(...args);
        const used = Date.now() - start;
        console.log(`call ${fn.name}(${args}) used ${used}ms`);
    }
}

caculate = log(caculate);
caculate(1000000);
caculate(10000000);