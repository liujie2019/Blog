### 1. js 统计一个字符串出现频率最高的字母/数字
```
let str = 'asdfghjklaqwertyuiopiaia';
const strChar = str => {
    let string = [...str],
        maxValue = '',
        obj = {},
        max = 0;
    string.map(value => {
        obj[value] = obj[value] == undefined ? 1 : obj[value] + 1
        if (obj[value] > max) {
            max = obj[value]
            maxValue = value
        }
    })
return maxValue;
}
console.log(strChar(str))    // a
```
### 2. 数组去重
#### 2.1 map
```
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']
const unique = arr => {
    let obj = {}
    arr.map(value => {
        obj[value] = 0
    })
    return Object.keys(obj)
}
console.log(unique(arr))  // ['1','2','3','a','b']
```
#### 2.2. filter
```
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']
const unique = arr => {
    return arr.filter((ele, index, array) => {
        return index === array.indexOf(ele)
    })
}
console.log(unique(arr))  // ['1','2','3','a','b']
```
#### 2.3. set
```
let arr = ['1', '2', '3', '1', 'a', 'b', 'b']
const unique = arr => {
    return [...new Set(arr)]
}
console.log(unique(arr))  // ['1','2','3','a','b']
```
### 3. 翻转字符串
```
let str ="Hello Dog";
const reverseString = str =>{
    return [...str].reverse().join("");
}
console.log(reverseString(str))   // goD olleH
```
### 4. 数组中最大差值
#### 4.1. map
```
let arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];
const difference = arr => {
    let min = arr[0],
        max = 0;
    arr.map(value => {
        if (value < min) min = value
        if (value > max) max = value
    })
    return max - min ;
}
console.log(difference(arr))  // 74
```
#### 4.2. max、min
```
let arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];
const difference = arr => {
    let max = Math.max(...arr),
        min = Math.min(...arr);
    return max - min ;
}
console.log(difference(arr)) // 74
```
### 5. 不借助临时变量，进行两个整数的交换
#### 5.1. 数组解构
```
let a = 2,
    b = 3;
    [b,a] = [a,b]
    console.log(a,b)   // 3 2
```
#### 5.2 算术运算（加减）
```
输入a = 2,b = 3,输出 a = 3,b = 2
let a = 2,
    b = 3;
const swop = (a, b) => {
    b = b - a;
    a = a + b;
    b = a - b;
    return [a,b];
}
console.log(swop(2,3)) // [3,2]
```
#### 5.3 逻辑运算（异或）
```
let a = 2,
    b = 3;
const swop = (a, b) => {
    a ^= b; //x先存x和y两者的信息
    b ^= a; //保持x不变，利用x异或反转y的原始值使其等于x的原始值
    a ^= b; //保持y不变，利用x异或反转y的原始值使其等于y的原始值
    return [a,b];
}
console.log(swop(2,3)) // [3,2]
```
### 6. 排序 (从小到大)
#### 6.1. 冒泡排序
```
let arr = [43, 32, 1, 5, 9, 22];
const sort = arr => {
    let res = []
    arr.map((v, i) => {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    })
    return arr
}
console.log(sort(arr))  // [1, 5, 9, 22, 32, 43]
```

### 7. 数组平均数
```
/**
 * 数组平均数
 * 使用reduce()将每个值添加到累加器，初始值为0，总和除以数组长度。
 * @param {*} arr
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * total 必需。初始值, 或者计算结束后的返回值。
 * currentValue	必需。当前元素
 * currentIndex	可选。当前元素的索引
 * arr	可选。当前元素所属的数组对象。
 */
const averge = arr => arr.reduce((total, currentValue) => total + currentValue, 0) / arr.length;

console.log(averge([1,2,3,4]));
```

### 参考文档
1. [[译]非常有用的 48 个 JavaScript 代码片段，值得收藏！](https://juejin.im/entry/5a791567f265da4e8e7842a2)