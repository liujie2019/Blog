function mixins(...list) {
    return (target) => {
        console.log(target); // [Function: Myclass]
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo: () => {
        console.log('我是Foo的函数');
    }
};

@mixins(Foo)
class Myclass {}

const obj = new Myclass();
obj.foo(); // 我是Foo的函数