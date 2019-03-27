function testable(target) {
    target.myTestable = '123';
}

@testable
class myTestableClass {

}

console.log(myTestableClass.myTestable);