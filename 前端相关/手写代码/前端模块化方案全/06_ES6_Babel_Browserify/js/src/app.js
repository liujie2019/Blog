import { foo, bar } from './module1';
import { fun1, fun2 } from './module2';
import * as fn from './module2';
import module3 from './module3';

console.log(fn);
fn.fun1();
console.log('---------');
foo();
bar();
fun1();
fun2();
module3();