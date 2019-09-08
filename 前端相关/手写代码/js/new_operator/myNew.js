function myNewOperator() {
    if (typeof ctor !== 'function') {
        throw new Error('newOperator function the first param must be a function');
    }
    // new.target是指向构造函数的
    myNewOperator.target = ctor;
    // 新建一个对象，并指向构造函数原型
    var newObj = Object.create(ctor.prototype);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    // 获取构造函数的结果
    var ctorRes = ctor.apply(newObj, argsArr);
    // 判断构造函数结果是否为函数或者对象类型
    var isObject = typeof ctorRes === 'object' && ctorRes !== null;
    var isFunction = typeof ctorRes === 'function';
    // 为函数或者对象类型，直接返回该结果
    if (isObject || isFunction) {
        return ctorRes;
    }
    // 否则返回新建的实例对象
    return newObj;
}