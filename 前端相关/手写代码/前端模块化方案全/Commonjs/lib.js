let num = 1;
let obj = {
    name: 'lisi'
};
function increase() {
    num++;
    obj.name = 'wangwu';
}
module.exports = {
    // num,
    get num() {
        return num;
    },
    obj,
    increase
};