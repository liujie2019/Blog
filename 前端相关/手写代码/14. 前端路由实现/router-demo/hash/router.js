/**
 * hash路由的简单实现
 * 实现了路由的简单切换
 * @class Routers
 */
class Routers {
    constructor() {
        this.routes = {}; // 以键值对的形式存储路由
        this.currentUrl = ''; // 当前路由的url
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }
    // 存储路由的hash及其对应的callback函数
    route(path, callback) {
        this.routes[path] = callback || function() {};
    }
    // 触发路由hash变化时，执行对应的callback函数
    refresh() {
        // 获取当前的hash值
        this.currentUrl = location.hash.slice(1) || '/';
        // 调用当前的hash值所对应的callback函数
        this.routes[this.currentUrl]();
    }
}

// 初始化一个路由
window.Router = new Routers();
const content = document.querySelector('body');
function changeBgColor(color) {
    content.style.backgroundColor = color;
}

Router.route('/', () => {
    changeBgColor('blue');
});
Router.route('/red', () => {
    changeBgColor('red');
});
Router.route('/yellow', () => {
    changeBgColor('yellow');
});