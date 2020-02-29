const deepClone = obj => {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    const new_obj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        console.log(key);
        // 遍历obj，并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
            new_obj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return new_obj;
};

console.log(deepClone([{name: 'lisi', age: 22, hobbies: ['篮球', '足球']}]));