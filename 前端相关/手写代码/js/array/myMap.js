Array.prototype.myMap = function (cb) {
    if(!Array.isArray(this)) {
        return 'Type Error';
    }
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
        // 原生map的回调支持3个参数，数据项，数据项索引，当前数组
        newArr.push(cb(this[i], i, this));
    }
    return newArr;
};

const arr = [{
    name: 'lisi',
    age: 20
}, {
    name: 'wangwu',
    age: 22
}];

const resName = arr.myMap(item => {
    return item.name;
});

const resAge = arr.myMap(item => {
    return item.age;
});
console.log(resName); // [ 'lisi', 'wangwu' ]
console.log(resAge); // [ 20, 22 ]

// Array.prototype.MyMap = function(fn, context){
//     var arr = Array.prototype.slice.call(this); //由于是ES5所以就不用...展开符了
//     var mappedArr = [];
//     for (var i = 0; i < arr.length; i++ ){
//       mappedArr.push(fn.call(context, arr[i], i, this));
//     }
//     return mappedArr;
// }
