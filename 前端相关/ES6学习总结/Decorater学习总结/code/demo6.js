function sprintf(str, ...args) {
    console.log(args);
    console.log(args.shift());
    return str.replace(/%s/g, () => args.shift());
}

const name = ['lisi',];
console.log(sprintf('你好，%s', name));