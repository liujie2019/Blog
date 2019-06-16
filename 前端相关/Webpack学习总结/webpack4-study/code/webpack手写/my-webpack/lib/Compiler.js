const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
// babylon  主要把源码转成ast，Babylon是Babel中使用的 JavaScript 解析器。
// @babel/traverse 对ast解析遍历语法树 负责替换，删除和添加节点
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成
const babylon = require('babylon');
// 如果不写default，默认拿到的是一个对象
const traverse = require('@babel/traverse').default;
const type = require('@babel/types');
const generator = require('@babel/generator').default;
// 引入tapable
const {SyncHook} = require('tapable');
class Compiler {
    constructor(config) {
        this.config = config;
        // 保存入口文件路径
        this.entryId; // './src/index.js'
        // 保存所有模块的依赖关系
        this.modules = {};
        this.entry = config.entry; // 入口路径
        // 运行npx my-webpack的目录路径，即工作路径
        this.root = process.cwd();
        this.hooks = {
            entryOption: new SyncHook(),  // 入口选项
            compile: new SyncHook(),      // 编译
            afterCompile: new SyncHook(),  // 编译完成
            afterPlugins: new SyncHook(),   // 编译完插件
            afterLoaders: new SyncHook(),   // loader完插件
            run: new SyncHook(),         // 运行
            emit: new SyncHook(),        // 发射
            done: new SyncHook()         // 完成
        }
        // 如果传递了plugins参数
        const plugins = this.config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this); // 这里只是appLy方法不是改变this指向
            })
        }
        this.hooks.afterPlugins.call();
    }
    // 获取源码文件
    getSource(modulePath) {
        // 匹配各种文件规则
        const rules = this.config.module.rules; // 拿到webpack.config.js 中rules的数组
        let content = fs.readFileSync(modulePath, 'utf8');
        for (let rule of rules) {
            const {test, use} = rule;
            let useLength = use.length - 1;
            // 匹配成功就调用对应的loader处理文件内容
            if (test.test(modulePath)) {
                function normalLoader() {
                    // 从后往前依次调用loader
                    const loader = require(use[useLength--]);
                    content = loader(content);
                    // 递归调用loader实现源码转化
                    if (useLength >= 0) {
                        normalLoader();
                    }
                }
                normalLoader();
            }
        }
        this.hooks.afterLoaders.call();
        return content;
    }
    // 解析源码
    parse(source, parentPath) { // AST解析语法树
        // console.log(source, parentPath);
        const ast = babylon.parse(source);
        const dependencies = []; // 依赖的数组
        traverse(ast, {
            // 调用表达式
            CallExpression(p) {
                const node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; // 取到模块的引用名称
                    // 对于没有带扩展名的模块添加扩展名
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // ./a.js
                    moduleName = './' + path.join(parentPath, moduleName); // ./src/a.js
                    dependencies.push(moduleName);
                    node.arguments = [type.stringLiteral(moduleName)]; // 改掉源码
                }
            }
        });
        const sourceCode = generator(ast).code;
        return {sourceCode, dependencies};
    }
    // 用来构建模块，接收两个参数：模块文件路径和该模块是否是入口文件
    buildModule(modulePath, isEntry) {
        // 1. 根据模块路径拿到模块的内容
        const source = this.getSource(modulePath);
        // 拿到模块id，这里接收到的modulePath是一个绝对路径，我们需要将其转为相对路径
        // modulePath = modulePath - this.root
        const moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName; // 保存入口模块路径
        }
        // console.log(source, moduleName);
        // 获取moduleName的上一级目录，path.dirname(moduleName)，即获取到./src
        // 解析需要把source源码进行改造，返回一个依赖列表
        const {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));
        // 把模块的相对路径和该模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
        // 递归加载
        dependencies.forEach(item => {
            // false表示非入口文件
            this.buildModule(path.join(this.root, item), false);
        });
    }
    // 发射文件
    emitFile() {
        // 用数据渲染对应的模板
        // 获取到输出文件目录
        const main = path.join(this.config.output.path, this.config.output.filename);
        // 读取模板文件
        const templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        // 渲染模板文件
        const code = ejs.render(templateStr, {
            entryId: this.entryId,
            modules: this.modules
        });
        this.assets = {};
        // 路径对应的代码
        this.assets[main] = code;
        // 写入渲染好的模板
        fs.writeFileSync(main, this.assets[main]);
    }
    run() {
        // 触发开始运行的钩子
        this.hooks.run.call();
        // 触发开始编译的钩子
        this.hooks.compile.call();
        // 执行并且创建模块的依赖关系
        // true标识为入口模块
        // path.resolve(this.root, this.entry)是一个绝对路径
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 触发编译完成的钩子
        this.hooks.afterCompile.call();
        // console.log(this.modules, this.entryId);
        // 发射一个文件，即打包后的文件
        this.emitFile();
        // 触发发射完成的钩子
        this.hooks.emit.call();
        // 触发完成的钩子
        this.hooks.done.call();
    }
}

module.exports = Compiler;