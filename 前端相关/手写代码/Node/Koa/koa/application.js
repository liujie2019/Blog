// Koa的入口文件为application.js
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {
    constructor() {
        this.callbackFn;
        this.middlewares = [];
        // 将这些变量统一放到实例属性上，方便调用
        this.context = context;
        this.request = request;
        this.response = response;
    }
    // 常用的use方法
    use(cb) {
        this.middlewares.push(cb);
    }
    // 常用的监听服务端口方法
    listen() {
        // bind方法绑定this
        const server = http.createServer(this.handleRequest.bind(this));
        // 剩余运算符接收传递的参数(包括端口号和服务启动后的回调函数)
        server.listen(...arguments);
    }
    handleRequest(req, res) {
        res.statusCode = 404; // 默认页面找不到
        const ctx = this.createContext(req, res);
        // compose => 组合
        const composeMiddleware = this.compose(ctx, this.middlewares);
        // 当回调函数执行后，ctx.body值就会发生变化
        // 当此promise执行完成后，再去执行res.end()
        composeMiddleware.then(() => {
            const body = ctx.body;
            if (typeof body === 'undefined') {
                res.end('Not Found');
            } else if (typeof body === 'string') {
                // 响应
                res.end(body);
            }
        });
    }
    // 创建上下文对象
    createContext(req, res) {
        // 希望ctx可以拿到context的属性，但是不修改context
        // req是http模块原生的
        // request对象是koa自己实现的，response也同理
        const ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.req = ctx.request.req = req;
        ctx.response = Object.create(this.response);
        ctx.res = ctx.response.res = res;
        return ctx; // 返回上下文对象
    }
    // compose方法返回一个Promise
    compose(ctx, middlewares) {
        function dispatch(index) {
            // 越界说明都执行完毕了
            if (middlewares.length === index) return Promise.resolve();
            // 先取出第一个中间件，让其执行，将索引递增，调用next，就是将下一个中间件，继续执行
            const middleware = middlewares[index];
            // () => dispatch(index + 1)就是next方法
            // 返回一个Promise
            // 递归创建 套起来的promise
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
        }
        // dispatch方法返回的也是Promise
        return dispatch(0); // 让第一个中间件执行
    }
}

module.exports = Koa;