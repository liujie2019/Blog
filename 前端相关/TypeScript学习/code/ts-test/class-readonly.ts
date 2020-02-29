class Man2 {
    public readonly name:string = 'lisi';
}

const man2:Man2 = new Man2();
console.log(man2.name); // lisi
man2.name = 'wangwu'; // 报错，只读属性不能被修改