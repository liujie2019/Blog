// @testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。
// testable函数的参数target是MyTestableClass类本身
@testable
class myTestableClass {}

function testable(target) {
    // target指向myTestableClass本身
    target.isTestable = true;
}

console.log(myTestableClass.isTestable);