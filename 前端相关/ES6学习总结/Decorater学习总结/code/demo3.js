function mixins(list) {
    return target => {
        console.log(target); // [Function: Myclass]
        // 给类的原型添加方法
        Object.assign(target.prototype, list);
    }
}

const Foo = {
    foo: () => {
        console.log('我是Foo的函数');
    },
    bar: () => {
        console.log('我是Bar的函数');
    }
};

@mixins(Foo)
class Myclass {}

const obj = new Myclass();
obj.foo(); // 我是Foo的函数
obj.bar(); // 我是Bar的函数