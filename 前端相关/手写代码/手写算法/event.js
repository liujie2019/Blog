class EventBus {
    constructor() {
        this.events = {};
    }
    on(name, cb) {
        if (!this.events[name]) {
            this.events[name] = [cb];
        } else {
            this.events[name].push(cb);
        }
    }
    emit(name, ...args) {
        this.events[name].forEach(cb => {
            cb(...args);
        });
    }
    off(name, fn) {
        if (this.events[name] && this.events[name].length) {
            this.events[name].filter(cb => cb !== fn);
        }
    }
    once(name, fn) {
        const onceFn = () => {
            fn.apply(this, arguments);
            this.off(name, fn);
        };
        this.on(name, onceFn);
        return this;
    }
}