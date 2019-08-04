function fn(num) {
    if (num <= 1) {
        return num;
    }
    return num * arguments.callee(num - 1);
}
const fn2 = fn;
fn = null;
console.log(fn2(5));