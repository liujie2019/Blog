const shallowClone = obj => {
    // 只拷贝对象
    // typeof [111] === 'object' // true
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    const new_obj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        console.log(key);
        // 遍历obj，并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
            new_obj[key] = obj[key];
        }
    }
    return new_obj;
};

console.log(shallowClone([{name: 'lisi', age: 22}]));