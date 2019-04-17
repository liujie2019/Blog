require.include("./module.js"); // 将subPageA和subPageB共用的module.js打包在此page中
require.ensure(
    ['./subPageA.js', './subPageB.js'], // js文件或者模块名称
    function() {
      var subPageA = require('./subPageA'); // 引入后需要手动执行，控制台才会打印
      var subPageB = require('./subPageB');
    },
    'subPage' // chunkName
  );

  require.ensure(
    ['lodash'],
    function() {
      var _ = require('lodash');
      _.join(['1', '2']);
    },
    'lodash'
  );

  export default 'page';