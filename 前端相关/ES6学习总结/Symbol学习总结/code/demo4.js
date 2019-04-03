// Symbol对象元素的保护作用
// 在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用Symbol进行保护。

// 没有进行保护的写法：
const obj = {name:'liujie', skill:'web', age:18};

for (const item in obj) {
    console.log(obj[item]);
}
