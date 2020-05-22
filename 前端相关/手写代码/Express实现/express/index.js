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
        // 通过next方法进行迭代
        let index = 0;
        function next(err) {
            // 如果数组全部迭代完成还没有找到，说明路径不存在
            if (index === app.routes.length) {
                return res.end(`Cannot ${methodParam} ${pathname}`);
            }
            let {method, path, handler} = app.routes[index++]; // 每次调用next就应该取下一个layer
            if (err) {
                // 如果有错误，应该去找错误中间件，错误中间件的特点是(handler有4个参数)
                if (handler.length === 4) {
                    handler(err, req, res, next);
                }
                else {
                    // 如果没有匹配到，要将err继续传递下去
                    next(err); // 继续走下一个layer继续判断
                }
            }
            else {
                if (method === 'middleware') { // 处理中间件
                    // 如果当前中间件的路由为/或者中间件与路由一致或者请求路径以中间件path开头 都会执行相应的中间件
                    if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        handler(req, res, next);
                    }
                    else {
                        next(); // 如果这个中间件没有匹配到，那么继续走下一个匹配
                    }
                }
                else { // 处理路由
                    if ((method === methodParam || method === 'all') && (path === pathname || path === '*')) {
                        handler(req, res);
                    }
                    else {
                        next();
                    }
                }
            }
        }
        next(); // 中间件中的next方法
    };
    app.routes = [];
    app.use = function (path, handler) {
        if (typeof handler !== 'function') {
            handler = path;
            path = '/';
        }
        let layer = {
            method: 'middleware', // 如果method是middleware，表示是中间件
            path,
            handler
        };
        app.routes.push(layer); // 将中间件放到容器内
    }
    app.use(function (req, res, next) { // express内置中间件
        let {pathname, query} = url.parse(req.url, true);
        let hostname = req.headers['host'].split(':')[0];
        req.path = pathname;
        req.query = query;
        req.hostname = hostname;
        next();
    });
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