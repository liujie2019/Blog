// Symbol的打印
// 我们先声明一个Symbol，然后我们在控制台输出一下。

const g = Symbol('liujie');
console.log(g);
console.log(g.toString());
// 这时候我们仔细看控制台是有区别的，没有toString的是红字，toString的是黑字。