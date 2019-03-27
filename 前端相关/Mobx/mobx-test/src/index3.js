"use strict";
/**
 * @param {any} target在这里就是指Numberic
 */
function log(target) {
    // 获取所有的类成员
    const desc = Object.getOwnPropertyDescriptors(target.prototype);
    for (const key of Object.keys(desc)) {
        // 忽略构造函数
        if (key === 'constructor') {
            continue;
        }
        const func = desc[key].value;
        if('function' === typeof func) {
            Object.defineProperty(target.prototype, key, {
                value(...args) {
                    console.log(`before ${key}`);
                    const res = func.apply(this, args);
                    console.log(`after ${key}`);
                    return res;
                }
            });
        }
    }
}

function readonly(target, key, descriptor) {
    descriptor.writable = false;
}

function validate(target, key, descriptor) {
    const func = descriptor.value;
    descriptor.value = function(...args) {
        for (let num of args) {
            if ('number' !== typeof num) {
                throw new Error(`${num} is not a number`);
            }
        }
        // 如果所有参数都符合要求，则调用原来的函数
        return func.apply(this, args);
    }
}

@log
class Numberic {
    @readonly PI = 3.1415926;
    @validate
    add(...nums) {
        return nums.reduce((m, n) => (m + n), 0);
    }
}
console.log(new Numberic().add(1, 2));
// 在严格模式下将会报错
new Numberic().PI = 100;
new Numberic().add(1, 'a');
