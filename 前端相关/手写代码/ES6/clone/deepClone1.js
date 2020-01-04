function getObjectType(obj) {
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Null') {
        return 'Null';
    } else if (type === 'Undefined') {
        return 'Undefined';
    } else {
        return type;
    }
}
function deepClone(obj) {
    let res, objType = getObjectType(obj);
    if (objType === 'Object') {
        res = {};
    } else if (objType === 'Array') {
        res = [];
    } else {
        // 如果是基本数据数据类型不复制，直接将源数据返回
        return obj;
    }
    // 遍历目标对象
    for (let key in obj) {
        const value = obj[key];
        res[key] = deepClone(value);
    }
    return res;
}

const obj = {
    name: 'lisi',
    age: 12,
    hobbies: ['🏀', '⚽️'],
    other: {
        a: 1,
        b: 2
    }
}

const obj2 = deepClone(obj);
console.log(obj2);
obj2.other.a = 666;
obj.hobbies.push('💰');
console.log(obj);
console.log(obj2);
