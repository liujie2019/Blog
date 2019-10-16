const handler = {
    apply(target, ctx, args) {
        console.log(target);
        console.log(ctx);
        console.log(args); // [1, 2]
        return Reflect.apply(...arguments) * 3;
    }
};

function sum(left, right) {
    return left + right;
}

let proxy = new Proxy(sum, handler);
// 执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截
console.log(proxy(1, 2)); // 9
console.log(proxy.call(null, 2, 3)); // 15
console.log(proxy.apply(null, [3, 4])); // 21