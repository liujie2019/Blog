const fn = () => {
    console.log(222);
}

console.log(111);
setTimeout(fn, 2000);
console.log(333);