/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

// 向外暴露了一个用于判断是否为简单对象的函数
export default function isPlainObject(obj) {
    // 如果参数的类型不是Object或者参数为null，直接return
    // 需要注意：typeof null的结果为'object'
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    // 判断proto的原型对象是否存在
    while (Object.getPrototypeOf(proto) !== null) {
        // 存在的话就把proto的原型对象赋值给proto，继续判断
        proto = Object.getPrototypeOf(proto)
    }
    // 实际上就是判断obj的原型链有几层，只有一层时返回true
    return Object.getPrototypeOf(obj) === proto
}
