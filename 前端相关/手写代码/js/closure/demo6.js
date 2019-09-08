// // 闭包中的this
// // 牢牢记住，this指向只有在函数调用时才能确定，跟定义时没关系
// var name = 'window';
// var obj = {
//     name: 'object',
//     getName: function() {
//         return function() {
//             return this.name;
//         }
//     }
// }
// // 这里最后是在全局作用域中调用的，因此this指向window
// console.log(obj.getName()()); // window

// var name = 'window';
// var obj = {
//     name: 'object',
//     getName: function() {
//         var that = this;
//         return function() {
//             return that.name;
//         }
//     }
// }
// console.log(obj.getName()()); // object

var name = 'window';
var obj = {
    name: 'object',
    getName: function() {
        return this.name;
    }
}
console.log(obj.getName()); // object
console.log((obj.getName = obj.getName)()); // window