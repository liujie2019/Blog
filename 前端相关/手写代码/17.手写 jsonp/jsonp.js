// 全局回调函数
// globalFn函数将会被调用并传入后台返回的数据
function globalFn(data) {
    console.log('通过jsonp获取后台数据:', data);
}

/**
 * 通过动态创建一个script标签发送一个 get 请求
 * 并利用浏览器对 <script> 不进行跨域限制的特性绕过跨域问题
 */
(function jsonp() {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = 'http://domain:port/testJSONP?name=lisi&age=20&callback=globalFn'; // 设置请求地址
    head.appendChild(script); // 这一步会发送请求
})();

// 后台代码
// 因为是通过script标签调用的 后台返回的相当于一个js文件
// 根据前端传入的 callback 的函数名直接调用该函数
function testJSONP(callback, name, age) {
    const data = {name, age};
    return `${callback}(${data})`;
}