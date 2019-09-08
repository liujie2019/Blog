function sprintf(str, args) {
    console.log(args);
    // shift()方法从数组中删除第一个元素，并返回该元素的值，该方法会修改原数组
    console.log(args.shift());
    console.log(args);
    // return str.replace(/%s/g, () => args.shift());
}

const name = ['lisi'];
console.log(sprintf('你好，%s', name));