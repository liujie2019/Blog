console.log('手写自己的webpack loader6666');
// ./前面的!表示将当前引入的文件交给行内loader处理
// const a = require('!!inline-loader!./a');
/**
const a = require('inline-loader!./a'); // 不加限制，所有loader都调用
const a = require('-!inline-loader!./a'); // -!禁用pre-loader、normal-loader，只使用post-loader和inline-loader处理处理a.js
const a = require('!inline-loader!./a'); // !禁用normal-loader，只使用pre-loader、post-loader和inline-loader处理处理a.js
const a = require('!!inline-loader!./a'); // !!禁用pre-loader、normal-loader、post-loader，只使用inline-loader处理处理a.js
*/