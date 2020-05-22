class Routers {
    constructor() {
        this.routes = {};
        // 初始化时监听popstate事件
        this._bindPopState();
    }
    // 初始化路由
    init(path) {
        window.history.replaceState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }
    // 将路径和其对应的回调函数加入hashMap存储
    route(path, callback) {
        this.routes[path] = callback || function() {};
    }
    // 进行路由之间的跳转并触发路由对应的回调
    go(path) {
        window.history.pushState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }
    // 监听popState事件
    _bindPopState() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path;
            this.routes[path] && this.routes[path]();
        }, false);
    }
    // 前进
    forWard(){
        history.forward();
    }
    // 后退
    backOff(){
        history.back();
    }
}

window.Router = new Routers();
// Router.init(location.pathname);
Router.init('/');
const content = document.querySelector('body');
const ul = document.querySelector('ul');
const btnBack = document.querySelector('#back');
const btnForward = document.querySelector('#forward');
btnBack.addEventListener('click', Router.backOff, false);
btnForward.addEventListener('click', Router.forWard, false);
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
ul.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
});