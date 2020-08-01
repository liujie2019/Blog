const obj = {
    name: 'lisi',
    age: 12
};

function observer(obj) {
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            defineReactive(obj, key, obj[key]);
        }
    }
}

function defineReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
        get() {
            console.log('get');
            return value;
        },
        set(newVal) {
            if (newVal !== value) {
                console.log('set');
                // 同时改变value的值，因为get中返回的是value
                value = newVal;
            }
        }
    });
}

observer(obj);

// console.log(obj.name);
obj.name = 'wangwu';
console.log(obj.name);