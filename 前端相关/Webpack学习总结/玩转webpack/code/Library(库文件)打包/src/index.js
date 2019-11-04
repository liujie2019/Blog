import * as math from './math';
import * as string from './string';
// 这样就封装了一个简单的库，包含加减乘除和字符串操作
// 但是这样直接到浏览器中是无法使用的，还需要进行webpack打包处理
export default {
    math,
    string
}