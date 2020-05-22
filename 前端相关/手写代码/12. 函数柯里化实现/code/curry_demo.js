/**
 * curry的第一个参数是要进行柯里化的函数，其他参数是要传入的值
 * @param {any} fn
 * @returns
 */
function curry(fn) {
    console.log(arguments); // { '0': [Function: add], '1': 5 }
    // arguments是一个类数组对象，需要使用call方法来调用数据的slice方法
    // 传入参数1表示被返回的数组中包含从第二个参数开始的所有参数
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        console.log(arguments); // { '0': 3 }
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

var curriedAdd = curry(add, 5);
console.log(curriedAdd(3)); // 8