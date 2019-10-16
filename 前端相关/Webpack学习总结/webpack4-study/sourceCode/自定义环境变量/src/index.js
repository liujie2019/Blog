import moment from 'moment';

// 手动引入所需要的语言包
import 'moment/locale/zh-cn';
// 设置语言
moment.locale('zh-cn');

console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')); // 2019-09-27 14:27:01
console.log(process.env);
// console.log(NODE_ENV, DEBUG);
console.log(process.env.NODE_ENV, process.env.DEBUG);

// if (NODE_ENV === 'production') {
//     console.log('Welcome to production');
// }
// if (DEBUG) {
//     console.log('Debugging output');
// }

if (process.env.NODE_ENV === 'production') {
    console.log('Welcome to production');
}
if (process.env.DEBUG) {
    console.log('Debugging output');
}