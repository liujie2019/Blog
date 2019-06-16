/**
 * hash路由的简单实现
 * 实现了路由的简单切换
 * 增加前进和回退功能
 * @class Routers
 */
class Routers {
    constructor() {
        this.routes = {}; // 以键值对的形式存储路由
        this.currentUrl = ''; // 当前路由的url
        this.history = []; // 记录出现过的hash
        this.isBack = false; // 默认不是后退操作
        this.currentIndex = this.history.length - 1;
        this.backOff = this.backOff.bind(this);
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
        if (!this.isBack) {
            // if (this.currentIndex < this.history.length - 1) {
            //     this.history = this.history.slice(0, this.currentIndex + 1);
            // }
            this.history.push(this.currentUrl);
            this.currentIndex++;
        }
        // 调用当前的hash值所对应的callback函数
        this.routes[this.currentUrl]();
        console.log('指针:', this.currentIndex, 'history:', this.history);
        this.isBack = false;
    }
    // 后退功能
    backOff() {
        this.isBack = true;
        this.currentIndex <= 0 ? (this.currentIndex = 0) : (this.currentIndex = this.currentIndex - 1);
        // 设置当前url的hash
        location.hash = `#${this.history[this.currentIndex]}`;
        // 执行当前hash对应的回调函数
        // this.routes[this.history[this.currentIndex]]();
    }
}

// 初始化一个路由
window.Router = new Routers();
const content = document.querySelector('body');
const button = document.querySelector('button');
button.addEventListener('click', Router.backOff, false);
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