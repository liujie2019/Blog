requirejs.config({
    baseUrl: './src',
    urlArgs: '_=' + new Date().getTime(),
    paths: {
        'jquery': './js/jquery', // 值为模块所在路径
        'helper': './js/helper',
        'lodash': './js/lodash',
        'bootstrap': './js/bootstrap'
    },
    shim: {
        'bootstrap': ['jquery']
    },
    map: {
        'app/api': {
            'jquery': './js/jquery'
        },
        'app/api2': {
            'jquery': './js/jquery2'
        }
    }
});
require(['./app/api2'], ($) => {
    console.log($);
});
// require(['helper', 'jquery', './app/api'], (helper, $, api) => {
//     $('#user').click(() => {
//         api.getUser().then((user) => {
//             console.log(user);
//         });
//     });
//     const res = helper.reverse([1, 2, 3]);
//     console.log(res);
// });