// 自己的express
const http = require('http');
const url = require('url');
function createApplication() {
    // app是一个监听函数
    let app = (req, res) => {
        // 取出每一个layer
        // 获取请求方法
        let methodParam = req.method.toLowerCase();
        // 获取请求路径
        let {pathname} = url.parse(req.url, true);
        for (let i = 0; i < app.routes.length; i++) {
            let {method, path, handler} = app.routes[i];
            if ((method === methodParam || method === 'all') && (path === pathname || path === '*')) {
                handler(req, res);
                break;
            }
        }
        res.end(`can not ${methodParam} ${pathname}`);
    };
    app.routes = [];
    // console.log(http.METHODS);
    app.all = function (path, handler) {
        let layer = {
            method: 'all', // 如果method是all表示全部匹配
            path,
            handler
        };
        app.routes.push(layer);
    }
    http.METHODS.forEach(method => {
        method = method.toLocaleLowerCase(); // 将方法转换成小写的
        app[method] = function (path, handler) {
            let layer = {
                method,
                path,
                handler
            };
            app.routes.push(layer);
        }
    });
    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }
    return app;
}

module.exports = createApplication;