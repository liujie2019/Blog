function testAble(isTestable) {
    return function (target) {
        target.isTestable = isTestable;
    }
}

// 注意这里:隐形传入了Class，语法类似于testable(true)(MyTestableClass)
@testAble(true)
class MyTestbaleClass {}
console.log(MyTestbaleClass.isTestable, 111); //true 111

@testAble(false)
class MyClass {}
console.log(MyClass.isTestable, 222); //false 222