// 源码里也叫proto
const proto = {

};
// proto.url = proto.request.url
// 获取proto.url，就去找proto.request的url
// 取值代理
function defineGetter(property, name) {
    // 自定义获取器 代理
    // __defineGetter__原生方法
    // 取值的时候，会调用回调函数
    proto.__defineGetter__(name, function() {
        // this指向proto，也就是ctx
        return this[property][name];
    });
}
// 针对ctx.body = ctx.response.body做代理
// 设置值代理
function defineSetter(property, name) {
    proto.__defineSetter__(name, function(value) {
        this[property][name] = value;
    });
}
defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('response', 'body');
defineSetter('response', 'body');
module.exports = proto;