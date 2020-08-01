Function.prototype.myBind = function(context, ...bindArgs) {
//     // func 为调用 bind 的原函数
//     const func = this;
//     context = context || window;

//     if (typeof func !== 'function') {
//         throw new TypeError('Bind must be called on a function');
//     }
//     // bind 返回一个绑定 this 的函数
//     return function(...callArgs) {
//         let args = bindArgs.concat(callArgs);
//         if (this instanceof func) {
//         // 意味着是通过 new 调用的 而 new 的优先级高于 bind
//         return new func(...args);
//         }
//         return func.call(context, ...args);
//     }
// }