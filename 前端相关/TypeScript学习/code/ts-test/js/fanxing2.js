"use strict";
// 函数类型接口
// interface ConfigFn {
//     (value1:string, value2:string):string;
// }
function getData(value) {
    return value;
}
var myGetData = getData;
console.log(getData('aaa'));
