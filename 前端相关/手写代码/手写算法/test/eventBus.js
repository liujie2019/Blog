class EventBus {
    constructor() {
        this.events = {};
    }
    on(type, cb) {
        if (this.events[type]) {
            this.events[type].push(cb);
        } else {
            this.events[type] = [cb];
        }
    }
    emit(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(cb => {
                cb(...args);
            });
        }
    }
    off(type, fn) {
        if (this.events[type]) {
            this.events[type] = this.events[type].filter(cb => cb !== fn);
        }
    }
    // 多次触发只执行一次
    once(type, cb) {
        const fn = (...args) => {
            cb(...args);
            this.off(type, fn);
        }
        this.on(type, fn);
    }
}

const eventBus = new EventBus();

function fn() {
    console.log('click1');
}

// eventBus.on('click', fn);
// eventBus.on('click', () => {
//     console.log('click2');
// });
// eventBus.on('click', () => {
//     console.log('click3');
// });

// eventBus.off('click', fn);

eventBus.once('click', fn);

eventBus.emit('click');
eventBus.emit('click');