let a:undefined;
a = undefined;

let b:null;
b = null;

let c:never;
c = (() => {
    throw new Error('错误');
})();