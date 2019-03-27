class HelloWorldPlugin {
    constructor(options) {
        //用户自定义配置
        this.options = options;
        console.log(this.options);
    }
    apply(compiler) {
        console.log("This is my first plugin.")
    }
}

module.exports = HelloWorldPlugin;