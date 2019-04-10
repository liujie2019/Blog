@testable
class myTestableClass {

}

// 添加原型属性
function testable(target) {
    target.prototype.isTestable = 'true';
}
const obj = new myTestableClass();
console.log(obj.isTestable); // true 在实例上访问原型属性