const path = require('path');
// 自定义插件
class P {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定入口选项的回调
        compiler.hooks.entryOption.tap('entryOption', () => {
            console.log('entryOption');
        });
    }
}
class P1 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定开始编译的回调
        compiler.hooks.compile.tap('compile', () => {
            console.log('compile');
        });
    }
}
class P2 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定编译完成的回调
        compiler.hooks.afterCompile.tap('afterCompile', () => {
            console.log('afterCompile');
        });
    }
}
class P3 {
    apply(compiler) {
         // 绑定插件处理完成的回调
        compiler.hooks.afterPlugins.tap('afterPlugins', () => {
            console.log('afterPlugins');
        });
    }
}
class P4 {
    apply(compiler) {
         // 绑定loader处理完成的回调
        compiler.hooks.afterLoaders.tap('afterLoaders', () => {
            console.log('afterLoaders');
        });
    }
}
class P5 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定开始运行的回调
        compiler.hooks.run.tap('run', () => {
            console.log('run');
        });
    }
}
class P6 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定发射完成的回调
        compiler.hooks.emit.tap('emit', () => {
            console.log('emit');
        });
    }
}

class P7 {
    apply(compiler) {
         // 绑定编译完成的回调
        compiler.hooks.done.tap('done', () => {
            console.log('done');
        });
    }
}
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loaders', 'my-style-loader'),
                    path.resolve(__dirname, 'loaders', 'my-less-loader')
                ]
            }
        ]
    },
    plugins: [
        new P(),
        new P1(),
        new P2(),
        new P3(),
        new P4(),
        new P5(),
        new P6(),
        new P7()
    ]
}