class SyncPlugin {
    constructor(options) {
        // console.log(options);
        // 这里获取插件参数
        this.options = options;
    }
    apply(compiler) {
        console.log('我是同步插件');
        compiler.hooks.done.tap('SyncPlugin', () => {
            console.log('编译完成');
        });
    }
}

module.exports = SyncPlugin;