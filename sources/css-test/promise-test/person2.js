let foo = {};
let F = function() {};
Object.prototype.a = 'aa';
Function.prototype.b = 'bb';

console.log(foo.a); // aa
console.log(foo.b); // undefined
console.log(F.a); // aa
console.log(F.b); // bb