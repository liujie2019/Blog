"use strict";
// 元组类型(tuple) 属于数组的一种，可以给数组中的每个索引元素指定数据类型
var tuple = [123, 'test'];
console.log(tuple); // [123, "test"]
tuple.push('aaa');
console.log(tuple); // [123, "test", "aaa"]
// console.log(tuple[0].toFixed(2)); // 保留两位小数
// console.log(tuple[1].slice(1)); // 从第二位开始截取
