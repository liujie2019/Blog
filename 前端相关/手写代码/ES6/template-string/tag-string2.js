const name = 'lisi', age = 12;
const res = say`${name} is ${age} old year`;

console.log(res);

function say(literals, ...values) {
    // console.log(literals, val1, val2);
    const res = literals.reduce((pre, cur, curIndex) => {
        console.log(curIndex);
        const value = values[curIndex - 1];
        return pre + value + cur;
    });
    return res;
}