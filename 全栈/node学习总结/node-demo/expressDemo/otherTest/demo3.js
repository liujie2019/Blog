let str = '123abc:def:/test/app';
let res = str.replace(/abc:(def|ghk|uvw|xyz):/g, (m, n1, n2, n3) => {
    console.log(m);
    console.log(n1);
    console.log(n2);
    console.log(n3);
});