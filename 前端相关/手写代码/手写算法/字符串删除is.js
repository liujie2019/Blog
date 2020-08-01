// 有一个 字符串里面有很多is 请写一个方法只保留一个is
let str = 'aisisiscisaissss';

// 获取到最后一个is出现的位置
let lastIndex = str.lastIndexOf('is');

let prefix = str.substring(0, lastIndex);
let res = str.substring(lastIndex);

prefix = prefix.replace(/is/g, '');
console.log(prefix + res);
