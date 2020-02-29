import {sayName, sayAge} from './testES6Export';
import b from './testES6Export';
// as导出是把零散的export聚集在一起作为一个对象，而export default是导出为default属性。
import * as testModule from './testES6Export';

console.log(b);
sayName();
sayAge();
console.log(testModule);
console.log(testModule.b); // undefined
console.log(testModule.default); // 321
console.log(testModule.a); // 123
