class CopyrightWebpackPlugin {
    constructor() {
        console.log('插件被使用了');
        // console.log(options); // { name: 'haha' }
    }
    apply(compiler) {
        // 同步钩子--不需要传cb参数
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
            console.log('同步钩子');
        });
        // compiler.hooks 钩子函数，就是在某个时刻会执行的函数
        // compiler中存放的是配置的内容以及包括打包的所有内容
        // 而compilation中存放是某一次打包的内容
        // 第一个参数是插件名称
        // emit钩子函数会在将文件放入到dist目录后触发
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            debugger
            compilation.assets['copyright.txt'] = {
                source: function() { // 指定文件内容
                    return 'copyright by liujie';
                },
                size: function() { // 指定文件大小
                    return 21;
                }
            };
            cb(); // 异步钩子都需要执行cb
        });
    }
}

module.exports = CopyrightWebpackPlugin;