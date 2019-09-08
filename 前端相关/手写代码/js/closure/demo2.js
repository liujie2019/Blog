// 生成闭包
function outer() {
    var a = 1, b = 2;
    function closure() { // 闭包
        return a + b;
    }
    return closure; // 返回闭包函数
}