/**
 * co模块
*/
const {fs} = require('mz');
const co = require('co');
function* gen() {
    const name = yield fs.readFile('./name.txt', 'utf8');
    const age = yield fs.readFile('./age.txt', 'utf8');
    const a = yield [1, 2, 3];
    console.log(name.toString());
    console.log(age.toString());
    return age + a;
}

// co(gen);
co(gen).then(data => {
    console.log('gen函数执行完毕');
    console.log(data);
});