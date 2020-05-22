;(function() {
    require.config({
        baseUrl: 'js/', // 基础路径，出发点在根目录下
        paths: {
            // 映射：模块标识名：路径
            alerter: './modules/alerter', // 注意这里alerter不能加后缀.js
            dataService: './modules/dataService',
            jquery: './libs/jquery', // 引入第三方库，注意：写成jQuery: './libs/jquery'会报错,
            underscore: './libs/underscore',
            custom: './modules/custom'
        },
        shim: { // shim可以理解成'垫片'，用来帮助require.js加载非AMD规范的库
            'custom': {
                deps: ['jquery'],
                exports: 'obj123'
            }
        }
    });
    require(['alerter', 'custom'], function(alerter, custom) {
        alerter.showMsg();
        custom.test();
    });
})()