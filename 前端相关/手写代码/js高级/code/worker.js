function fibonacci(n) {
    return n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(this);
self.onmessage = function(event) {
    let num = event.data;
    console.log('子线程接收到主线程发送的数据：' + num);
    // 计算
    let res = fibonacci(num);
    self.postMessage(res);
    console.log('子线程向主线程返回的数据：' + res);
    alert(res); // alert是window的方法，在子线程中无法使用
    // 说明子线程中的全局对象不再是window了，所以在子线程中无法更新用户界面
}