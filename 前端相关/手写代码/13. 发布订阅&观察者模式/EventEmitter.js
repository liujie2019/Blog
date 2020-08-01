// 手写发布订阅模式
// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//     // 订阅
//     on(type, callback) {
//         if (!this.events[type]) {
//             this.events = Object.create(null); // 创建一个空对象
//         }
//         if (!this.events[type]) {
//             this.events[type] = [callback];
//         } else {
//             this.events[type].push(callback);
//         }
//     }
//     // 取消订阅
//     off(type, callback) {
//         if (!this.events[type]) return;
//         this.events[type] = this.events[type].filter(item => item !== callback);
//     }
//     // 只执行一次订阅事件
//     once(type, callback) {
//         function fn() {
//             callback();
//             this.off(type, fn); // 执行一次就会取消订阅
//         }
//         this.on(type, fn);
//     }
//     // 触发事件
//     emit(type, ...args) {
//         this.events[type] && this.events[type].forEach(cb => cb.apply(this, args));
//     }
// }

// const event = new EventEmitter();
// const handler = (...args) => console.log(args);
// // 订阅
// event.on('click', handler);
// // 触发
// event.emit('click', 1, 2, 3);
// // 取消订阅
// event.off('click', handler);
// // 取消后再次触发不生效
// event.emit('click', 1, 2);

// event.once('click-once', () => console.log('once'));
// event.emit('click-once');
// event.emit('click-once');

class EventBus {
    constructor() {
        this.events = {};
    }
    on(type, cb) {
        if (!this.events[type]) {
            this.events[type] = [cb];
        } else {
            this.events[type].push(cb);
        }
    }
    emit(type, ...args) {
        if (this.events[type].length) {
            this.events[type].forEach(cb => cb.apply(this, args));
        }
    }
    off(type, fn) {
        if (this.events[type].length) {
            this.events[type] = this.events[type].filter(cb => cb !== fn);
        }
    }
    once(type, cb) {
        function fn(...args) {
            cb(...args);
            this.off(type, fn);
        }
        this.on(type, fn);
    }
}

const event = new EventBus();
const handler = (...args) => console.log(args);
// 订阅
event.on('click', handler);
// 触发
event.emit('click', 1, 2, 3);
// // 取消订阅
event.off('click', handler);
// // 取消后再次触发不生效
// event.emit('click', 1, 2);

event.once('click-once', (...args) => console.log('once', args));
event.emit('click-once', 1, 2);
event.emit('click-once');