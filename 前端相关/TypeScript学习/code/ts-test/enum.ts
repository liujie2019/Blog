enum Flag {
    succuss = 1,
    error = 2,
    undedined = -1,
    null = -2
}
// 指定s和e均为枚举类型
let s:Flag = Flag.succuss;
let e:Flag = Flag.error;
let u:Flag = Flag.undedined;
let n:Flag = Flag.null;
console.log(s, e, u, n); // 1 2 -1 -2