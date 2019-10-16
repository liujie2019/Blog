const obj = {
    name: 'lisi'
};

const handler = {
    set(target, key, value, receiver) {
        console.log(target); // {name: "lisi"}
        console.log(receiver); // Proxy {name: "lisi"}
        Reflect.set(target, key, value, receiver);
    },
    defineProperty(target, key, attribute) {
        console.log(target); // {name: "lisi"}
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};

const proxy = new Proxy(obj, handler);
proxy.name = 'wangwu';