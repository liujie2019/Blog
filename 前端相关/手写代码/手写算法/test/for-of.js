let obj = {
    name: 'lisi',
    age: 18,
    [Symbol.iterator]: function() {
        let self = this;
        let keys = Object.keys(self);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    };
                } else {
                    return {
                        value: undefined, done: true
                    };
                }
            }
        };
    }
};

// generator实现，默认返回一个迭代器对象
let obj = {
    name: 'lisi1',
    age: 20,
    [Symbol.iterator]: function* () {
        let self = this;
        let keys = Object.keys(self);
        for (let key of keys) {
            yield self[key];
        }
    }
};

// for...of只能遍历可迭代对象
for (let i of obj) {
    console.log(i);
}


var s1 = 'get-element-by-id';

function fn(str) {
    return str.replace(/-\w/g, s => {
        return s[1].toUpperCase(); // getElementById
    });
}

console.log(fn(s1));

var s2 = 'getElementById';

function fn(str) {
    return str.replace(/[A-Z]/g, s => {
        return '-' + s.toLowerCase(); // get-element-by-id
    });
}

console.log(fn(s2));

let s3 = 'aaa bbb ccc';

function fn(str) {
    return str.replace(/\b\w+\b/g, s => {
        return s[0].toUpperCase() + s.slice(1);
    });
}
console.log(fn(s3));

```js
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)

/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
```

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

function parseParam(url) {
    let res = {};
    let search = url.split('?')[1];
    // console.log(search); // user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled
    let arr = search.split('&');
    for (let item of arr) {
        if (item.includes('=')) {
            let [key, value] = item.split('=');
            if (res[key]) {
                res[key] = [].concat(res[key], decodeURIComponent(value));
            } else {
                res[key] = decodeURIComponent(value);
            }
        } else {
            res[item] = true;
        }
    }
    return res;
}

console.log(parseParam(url));

let obj = {
    name: 'lisi',
    age: 20,
    [Symbol.iterator]() {
        let self = this;
        let keys = Object.keys(self);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        }
    }
};

for (let i of obj) {
    console.log(i);
}

function printf(str, info) {
    return str.replace(/\$\{(\w+)\}/g, function(word) {
        return info[arguments[1]];
    });
}

const str = 'My name is ${name}, I am from ${city}';
const info = {
    name: 'AaDerBrane',
    city: 'GungZhou'
};
console.log(printf(str, info)); // My name is AaDerBrane, I am from GungZhou