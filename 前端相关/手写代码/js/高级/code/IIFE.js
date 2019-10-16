(function(){ // 匿名函数自调用
    var a = 3;
    console.log(a);
})()

;(function() {
    var a = 1;
    function test() {
        console.log(++a);
    }
    window.$ = function() { // 向外暴露一个全局函数
        return {test};
    }
})();

console.log($().test());