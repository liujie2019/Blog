Object.prototype.x = 1;
var obj = {}; // 这样的话,属性x是可枚举的
console.log(obj.x);
for (var key in obj) {
    console.log(key);
}