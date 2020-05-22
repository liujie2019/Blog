class FileListPlugin {
    constructor(options) {
        console.log(options);
        this.options = options;
    }
    apply(compiler) {
        // emit是异步hook，使用tapAsync触及它，还可以使用tapPromise(异步)/tap(同步)
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
            // 在生成文件中，创建一个头部字符串
            let fileList = 'In this build:\n\n';
            // 遍历所有编译过的资源文件，
            // 对于每个文件名称，都添加一行内容。
            for (let filename in compilation.assets) {
                console.log(compilation.assets);
                fileList += `- ${filename}\n`;
            }
            // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
            compilation.assets['fileList.md'] = {
                source: function() {
                    return fileList;
                },
                size: function() {
                    return fileList.length;
                }
            };
            callback();
        });
    }
}

module.exports = FileListPlugin;