// 定义有依赖模块
define(['dataService', 'jquery', 'underscore'], function(dataService, $, _) {
    let b = 'work';
    let arr = [1, 2, 3];
    function showMsg() {
        $('body').css('background', 'red');
        console.log(`${dataService.foo()}-${b}`);
        let sum = _.reduce(arr, (a, b) => a + b, 0);
        console.log(sum);
    }
    // 暴露模块
    return {showMsg};
});