const path = require('path');
// 自定义插件
class P {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定 入口选项的回调
        compiler.hooks.entryOption.tap('emit', () => {
            console.log('entryOption');
        });
    }
}
class P1 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定 开始编译的回调
        compiler.hooks.compile.tap('emit', () => {
            console.log('compile');
        });
    }
}
class P2 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定 编译完成的回调
        compiler.hooks.afterCompile.tap('emit', () => {
            console.log('afterCompile');
        });
    }
}
class P3 {
    apply(compiler) {
         // 绑定 插件处理完成的回调
        compiler.hooks.afterPlugins.tap('emit', () => {
            console.log('afterPlugins');
        });
    }
}
class P4 {
    apply(compiler) {
         // 绑定 插件处理完成的回调
        compiler.hooks.afterLoaders.tap('emit', () => {
            console.log('afterLoaders');
        });
    }
}
class P5 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定 开始运行的回调
        compiler.hooks.run.tap('emit', () => {
            console.log('run');
        });
    }
}
class P6 {
    apply(compiler) {// 这里只是apply方法不是改变this指向
        // 绑定 发射完成的回调
        compiler.hooks.emit.tap('emit', () => {
            console.log('emit');
        });
    }
}

class P7 {
    apply(compiler) {
         // 绑定 编译完成的回调
        compiler.hooks.done.tap('emit', () => {
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