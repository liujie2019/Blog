const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    },
    field5: [1, 2, 3, [2, 3]]
};

target.target = target;

/**
 *
 * @param {未考虑数组} source
 */
// function clone(source) {
//     let target = {};
//     for (let key in source) {
//         if (source.hasOwnProperty(key)){
//             if (typeof source[key] === 'object') {
//                 target[key] = clone(source[key]);
//             } else {
//                 target[key] = source[key];
//             }
//         }
//     }
//     return target;
// }

/**
 * 考虑了数组，但未考虑循环引用
*/
// function clone(source) {
//     let target = new source.constructor();
//     for (let key in source) {
//         if (source.hasOwnProperty(key)){
//             if (typeof source[key] === 'object') {
//                 target[key] = clone(source[key]);
//             } else {
//                 target[key] = source[key];
//             }
//         }
//     }
//     return target;
// }

/**
 * 解决循环引用
*/
function clone(source, hash = new WeakMap()) {
    if (typeof source === 'object') {
        let cloneSource = new source.constructor();
        // 每次clone对象之前先去hash中查找，找到直接返回
        if (hash.get(source)) {
            return hash.get(source);
        }
        // 如果克隆的目标是对象，则存入hash中
        hash.set(source, cloneSource);
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                cloneSource[key] = clone(source[key], hash);
            }
        }
        return cloneSource;
    }
    return source;
}

let newTarget = clone(target);
newTarget.field4.child = 'haha';


/*
{ field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: { child: 'child', child2: { child2: 'child2' } },
  field5: [ 1, 2, 3, [ 2, 3 ] ],
  target: [Circular] }
*/
// target属性变为了一个Circular类型，即循环应用
console.log(newTarget);
console.log(target);