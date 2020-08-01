// let obj = {
//     name: 'lisi',
//     age: 18,
//     [Symbol.iterator]: function() {
//         let self = this;
//         let keys = Object.keys(self);
//         let index = 0;
//         return {
//             next() {
//                 if (index < keys.length) {
//                     return {
//                         value: self[keys[index++]],
//                         done: false
//                     };
//                 } else {
//                     return {
//                         value: undefined, done: true
//                     };
//                 }
//             }
//         };
//     }
// };

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