class LogWebpackPlugin {
    constructor(emitCallback, doneCallback) {
        this.doneCallback = doneCallback;
        this.emitCallback = emitCallback;
    }

    apply(compiler) {
        compiler.hooks.compile.tap('LogWebpackPlugin', () => {
            console.log('开始编译了');
        });
        compiler.hooks.compilation.tap('LogWebpackPlugin', () => {
            console.log('开始compilation了');
        });
        compiler.hooks.emit.tap('LogWebpackPlugin', () => {
            this.emitCallback();
        });
        compiler.hooks.done.tap('LogWebpackPlugin', () => {
            this.doneCallback();
        });
    }
}

module.exports = LogWebpackPlugin;