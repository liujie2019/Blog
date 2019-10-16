console.log('设置全局变量');
import $ from 'jquery';
// import $ from 'expose-loader?$!jquery';
console.log('$---', $); // 可以访问，正常输出
console.log('window.$---', window.$); // undefined
console.log('window.jQuery---', window.jQuery);