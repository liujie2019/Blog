// 对象
var obj = {};
// 变量名不确定
var name = 'myName';

obj[name] = 'lisi';
obj.name = 'sss'; // .的方式是直接添加了name属性而不是myName
console.log(obj); // { myName: 'lisi', name: 'sss' }
