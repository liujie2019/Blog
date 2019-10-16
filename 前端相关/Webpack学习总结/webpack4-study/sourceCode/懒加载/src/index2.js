require.include('./module.js'); // 将pageA和pageB共用的module.js打包在此page中
require.ensure(
    ['./pageA.js', './pageB.js'], // js文件或者模块名称
    function() {
      var pageA = require('./pageA'); // 引入后需要手动执行，控制台才会打印
      var pageB = require('./pageB');
    },
    'subPage' // chunkName
  );

  require.ensure(
    ['jquery'],
    function() {
      var $ = require('jquery');
      $('body').css('background-color', 'red');
    },
    'jquery'
  );
