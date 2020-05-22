// 导出变量
export const a = 123;

// 导出方法-方式1
export function sayName() {
    console.log('lisi');
}

// 导出方法-方式2
function sayAge() {
    console.log(12);
}

export {sayAge};

// export default导出
const b = 321;
// export default const b = 321; 不支持这样书写
export default b;