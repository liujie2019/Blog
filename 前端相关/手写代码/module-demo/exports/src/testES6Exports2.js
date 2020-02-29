let a = '123';
let b = '456';
export {a};
export default b;
setTimeout(() => {
    a = '123456';
}, 1000);
b = '456123';