// 标签模板字符串
// const name = 'lisi';
// const age = 12;
// const info = highlight`${name} is ${age} old.`;


const str = 'My name is ${name}, I am from ${city}';
const info = {
    name: 'AaDerBrane',
    city: 'GungZhou'
};
console.log(printf(str, info)); // My name is AaDerBrane, I am from GungZhou

function format(literals, ...values) {
    console.log(literals);
    console.log(values);
    let msg = '';
    for (let i = 0; i < values.length; i++) {
        msg += literals[i];
        msg += values[i];
    }
    msg += literals[literals.length - 1];
    return msg;
}

function printf(str, info) {
    const {name, city} = info;
    const res = format`My name is ${name}, I am from ${city}`;
    return res;
}
