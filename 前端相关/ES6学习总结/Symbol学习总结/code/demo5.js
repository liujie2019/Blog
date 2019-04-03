// 现在我不想别人知道我的年龄，这时候我就可以使用Symbol来进行循环保护。

const obj = {name:'liujie', skill:'web'};
const age = Symbol();
obj[age] = 18;
for (const item in obj) {
    console.log(obj[item]);
}
console.log(obj);