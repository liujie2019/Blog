class EventEmitter {
    constructor() {
        this.events = new Map();
        this.maxListeners = 10;
    }
    emit(type, ...args) {
        const handler = this.events.get(type);
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args);
                }
                else {
                    handler[i].call(this);
                }
            }
        }
        else {
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        }
    }
    addListener(type, cb) {
        const handler = this.events.get(type);
        // 当前监听不存在
        if (!handler) {
            this.events.set(type, cb);
        }
        // 当前只有一个监听函数
        else if (handler && typeof handler === 'function') {
            this.events.set(type, [handler, cb]);
        }
        // 多个监听函数
        else {
            handler.push(cb);
        }
    }
    removeListener(type, cb) {
        const handler = this.events.get(type);
        if (handler && typeof handler === 'function') {
            this.events.delete(type, cb);
        }
        else {
            let position;
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === cb) {
                    position = i;
                }
                else {
                    position = -1;
                }
            }
            if (position !== -1) {
                handler.splice(position, 1);
                // 如果清除后只有一个函数,那么取消数组,以函数形式保存
                if (handler.length === 1) {
                    this.events.set(type, handler[0]);
                }
            }
            else {
                return this;
            }
        }
    }
}

const emitter = new EventEmitter();
const fn1 = state => {
    console.log(`宝宝${state}`);
};
const fn2 = state => {
    console.log(`我${state}`);
};
emitter.addListener('daughter', fn1);
emitter.addListener('daughter2', fn1);

emitter.removeListener('daughter', fn1);
// emitter.emit('daughter', '心情不好了');
emitter.emit('daughter2', '心情不好了');
// emitter.emit('daughter', '心情好了');