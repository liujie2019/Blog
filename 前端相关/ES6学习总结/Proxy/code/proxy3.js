const safetyProxy = new Proxy({id: 2}, {
    set(target, key, value) {
        const likeKey = Object.keys(target).find(k => k.toLowerCase() === key.toLowerCase());
        if (!(key in target) && likeKey) {
            throw new Error('已经存在相似的key');
        }
        target[key] = value;
    }
});

// safetyProxy.Id = 3;
safetyProxy.name = 'lisi';