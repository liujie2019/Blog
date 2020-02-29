function observer(target) {
    if (typeof target !== 'object' || target == null) {
        return target;
    }
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            defineReactive(key, target[key], target);
        }
    }
}

function defineReactive(key, value, target) {
    // 针对key的value是对象的情况，递归遍历子对象
    observer(value);
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (value !== newValue) {
                // 如果新值是对象的话，递归该对象 进行监听
                observer(newValue);
                updateView();
                value = newValue;
            }
        }
    });
}

function updateView() {
    console.log('视图更新了');
}

// const person = {name: 'lisi', age: 20};
// observer(person);
// person.name = 'wangwu';

// const person = {name: 'lisi', age: {a: 18}};
// observer(person);
// console.log(person);
// person.age.a = 19;

const person = {name: 'lisi', age: {a: 18}};
observer(person);
console.log(person);

person.age = {a: 20};
person.age.a = 18;