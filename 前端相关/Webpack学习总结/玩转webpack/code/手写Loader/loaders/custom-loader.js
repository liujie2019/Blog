function customLoader(source) {
    // return '!!!' + source;
    // 该loader仅仅是将源代码中的loader字符串替换为hello
    return source.replace('loader', 'hello123');
}

module.exports = customLoader;