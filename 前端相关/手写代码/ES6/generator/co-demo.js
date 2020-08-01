const co = require('co');
const {fs} = require('mz');

function* gen() {
    const s1 = yield fs.readFile('./name.txt');
    const s2 = yield fs.readFile('./age.txt');
    console.log(s1.toString());
    console.log(s2.toString());
}

co(gen).then(() => {
    console.log('done');
});
