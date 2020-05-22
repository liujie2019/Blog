const handler = {
    has(target, key) {
        // 隐藏私有属性
        if (key.startsWith('_')) {
            return false;
        }
        return key in target;
    }
};

const proxy = new Proxy({name: 'lisi', _age: 18}, handler);
console.log('_age' in proxy); // false
console.log('name' in proxy); // true