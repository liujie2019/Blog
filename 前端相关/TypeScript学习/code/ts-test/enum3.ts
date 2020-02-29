enum SEX {man, woman, yao};
console.log(SEX.woman); // 这里返回1，是索引index值，跟数组很像

// console.log(''.padStart(20, '-'));
// 可以使用=给枚举赋值
enum SEX2 {
    man = '男人',
    woman = '女人',
    yao = '妖'
};
console.log(SEX2.woman); // 女人