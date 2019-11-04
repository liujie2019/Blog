class SyncPlugin {
    apply(compiler) {
        console.log('我是同步插件');
        compiler.hooks.done.tap('SyncPlugin', () => {
            console.log('编译完成');
        });
    }
}

module.exports = SyncPlugin;