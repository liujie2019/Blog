const obj = {
    name: 'lisi',
    sayName(age) {
        console.log(this.name + '---' + age);
    }
};
const obj2 = {name: 'wangwu'};

Function.prototype.myApply = function(ctx, args) {
    ctx.fn = this;
    const res = ctx.fn(...args);
    delete ctx.fn;
    return res;
}

obj.sayName(12); // lisi---12
obj.sayName.myApply(obj2, [18]); // wangwu---18
