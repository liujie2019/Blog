const obj = {
    name: 'lisi',
    sayName(age) {
        console.log(this.name + '---' + age);
    }
};
const obj2 = {name: 'wangwu'};

Function.prototype.myBind = function(ctx, ...args) {
    return () => this.apply(ctx, args);
}

obj.sayName.myBind(obj2, 12)(); // wangwu---12