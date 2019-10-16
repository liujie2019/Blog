;(function() {
    require.config({
        baseUrl: './', // 基础路径，出发点在根目录下
        paths: {
        }
    });
    require(['bundle'], function(bundle) {
        console.log('加载了');
    });
})()