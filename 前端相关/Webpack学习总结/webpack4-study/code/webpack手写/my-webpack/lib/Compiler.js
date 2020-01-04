const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
// babylon主要把源码转成ast，Babylon是Babel中使用的JavaScript解析器。
// @babel/traverse 对ast解析遍历语法树，负责替换，删除和添加节点
// @babel/types 用于AST节点的Lodash-esque实用程序库
// @babel/generator 结果生成
const babylon = require('babylon');
// 如果不写default，默认拿到的是一个对象
// @babel/traverse是一个ES6模块，需要加上default
const traverse = require('@babel/traverse').default;
const type = require('@babel/types');
// @babel/generator是一个ES6模块，需要加上default
const generator = require('@babel/generator').default;
// 引入tapable
const {SyncHook} = require('tapable');
class Compiler {
    constructor(config) {
        this.config = config; // config是webpack的配置文件
        // 需要保存入口文件的路径
        this.entryId; // './src/index.js'
        this.modules = {}; // 需要保存所有模块的依赖关系
        this.entry = config.entry; // 入口文件路径
        // 运行npx my-webpack命令的目录路径，即工作路径
        this.root = process.cwd();
        this.hooks = { // 定义一些钩子函数
            entryOption: new SyncHook(), // 解析入口选项钩子
            compile: new SyncHook(), // 开始编译钩子
            afterCompile: new SyncHook(), // 编译完成钩子
            afterPlugins: new SyncHook(), // 插件执行完钩子
            afterLoaders: new SyncHook(), // loader执行完插件
            run: new SyncHook(), // 开始运行钩子
            emit: new SyncHook(), // 文件发射完钩子
            done: new SyncHook()  // 打包完成钩子
        }
        // 获取webpack配置文件中的plugins参数
        const plugins = config.plugins;
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                // 调用每个插件的apply方法为hook注册相应的监听函数
                // this指向当前的compiler实例
                plugin.apply(this); // 这里的appLy方法是每个插件的apply方法，并不是改变this指向的apply方法
            })
        }
        this.hooks.afterPlugins.call();
    }
    // 获取文件源码
    getSource(modulePath) {
        // 匹配各种文件规则
        const rules = this.config.module.rules; // 拿到webpack.config.js中rules(规则)的数组
        // 获取当前文件源码
        let content = fs.readFileSync(modulePath, 'utf8');
        // 使用loader处理源码文件
        // 遍历所有的规则rule来处理源码文件
        for (let rule of rules) {
            const {test, use} = rule;
            let len = use.length - 1;
            // 匹配成功就调用对应的loader处理文件内容
            if (test.test(modulePath)) {
                function normalLoader() {
                    // 从后往前依次调用loader
                    const loader = require(use[len--]);
                    content = loader(content);
                    // 递归调用loader，实现源码转化
                    if (len >= 0) {
                        normalLoader();
                    }
                }
                normalLoader();
            }
        }
        this.hooks.afterLoaders.call();
        return content;
    }
    // 解析源码，接收两个参数：source(文件源码)，parentPath(模块父路径)
    parse(source, parentPath) { // AST解析语法树
        // console.log(source, parentPath);
        const ast = babylon.parse(source); // 将源码转为抽象语法树
        const dependencies = []; // 依赖的数组
        // traverse用来遍历ast
        traverse(ast, {
            // 匹配到调用表达式(require()、a()等都是调用表达式)，就会执行
            CallExpression(p) {
                const node = p.node; // 获取到对应的节点
                // 判断只有是require调用表达式的时候才继续向下执行
                if (node.callee.name === 'require') {
                    // 对require名称进行修改，改为'__webpack_require__'
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; // 取到模块的引用名称
                    // 对于没有写扩展名的模块添加扩展名，其实就是对没有写扩展名的情况做兼容处理
                    // 比如require('./a')改为require('./a.js')
                    // path.extname(moduleName)判断模块是否存在扩展名
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // ./a.js
                    // 给模块加上父路径
                    moduleName = './' + path.join(parentPath, moduleName); // ./src/a.js
                    dependencies.push(moduleName);
                    // 修改源码：这里是将require('./a.js')改为了require('./src/a.js')
                    // 调用了@babel/types的stringLiteral方法
                    node.arguments = [type.stringLiteral(moduleName)];
                }
            }
        });
        const sourceCode = generator(ast).code; // 基于新的ast生成代码
        return {sourceCode, dependencies};
    }
    // 用来构建模块，接收两个参数：模块文件绝对路径和该模块是否是入口文件
    buildModule(modulePath, isEntry) {
        // 1. 根据模块路径拿到模块的内容
        const source = this.getSource(modulePath);
        // 拿到模块id，这里接收到的modulePath是一个绝对路径，我们需要将其转为相对路径
        // 模块id modulePath = modulePath - this.root
        // path.relative获取相对路径，实际拿到的是src/index.js，因此还需要加上'./'
        // console.log(path.relative(this.root, modulePath)); // src/index.js
        const moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = moduleName; // 保存入口模块路径
        }
        /*
        > path.dirname('./src/index.js')
        './src'
        */
        // moduleName为'./src/index.js'
        // 获取moduleName的上一级目录，path.dirname(moduleName)，即获取到./src
        // 解析需要把source源码进行改造，返回一个依赖列表
        const {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));
        // 把模块的相对路径和该模块中的内容对应起来
        // this.modules的key是模块的相对路径，值是模块的内容
        this.modules[moduleName] = sourceCode;

        // 递归加载
        // dependencies是一个依赖模块数组，里面存放着依赖模块的相对路径
        dependencies.forEach(dep => {
            // false表示非入口文件
            // 先将依赖模块路径转为绝对路径path.join(this.root, dep)
            this.buildModule(path.join(this.root, dep), false);
        });
    }
    // 发射文件
    emitFile() {
        // 用数据渲染对应的模板
        // 获取到输出文件目录
        const main = path.join(this.config.output.path, this.config.output.filename);
        // 读取模板文件
        // __dirname获取当前文件所在目录
        const templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        // 渲染模板文件，传递了两个数据entryId和modules
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
        // 触发开始执行的钩子
        this.hooks.run.call();
        // 触发开始编译的钩子
        this.hooks.compile.call();
        // 执行并且创建模块的依赖关系
        // path.resolve(this.root, this.entry)是一个绝对路径，即文件路径
        // this.root是项目的根路径，即执行npx my-webpack的根路径
        this.buildModule(path.resolve(this.root, this.entry), true); // true标识该模块是入口模块
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