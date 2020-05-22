Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
        // 调用call的如果不是函数则报错
        throw TypeError('not a function');
    }
    // 当call的第一个参数不存在或者为null，this指向window
    context = context || window;
    // 给context添加一个属性
    // getInfo.call(obj, 'lisi', 22) => obj.fn = getInfo
    context.fn = this;
    // 获取context后面参数
    const args = [...arguments].slice(1); // ['lisi', 22]
    const result = context.fn(...args);
    // 删除属性fn
    delete context.fn;
    return result;
}

const obj = {
    name: 'lisi',
    age: 22
};

function getInfo() {
    console.log(this.name + '--' + this.age);
}

getInfo.myCall(obj);