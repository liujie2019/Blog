export default function compose(...funcs) {
    // 当funcs长度为0时，返回一个传入什么就返回什么的函数
    if (funcs.length === 0) {
        return arg => arg
    }
    // 当funcs长度为1时，返回funcs中的第一项对应的函数
    if (funcs.length === 1) {
        return funcs[0]
    }
    // 当funcs长度大于1时，调用Array.prototype.reduce方法进行整合
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}