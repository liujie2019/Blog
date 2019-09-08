class Animal {

}
console.log(typeof Animal); // function
console.log(Animal === Animal.prototype.constructor); // true
// 说明：类的数据类型就是函数，类本身就是指向构造函数