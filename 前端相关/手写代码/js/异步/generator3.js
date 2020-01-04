const fetch = require('node-fetch');

function* gen() {
    const url = 'https://api.github.com/users/github';
    const res = yield fetch(url);
    console.log(res);
}

const g = gen();
const res = g.next();
// console.log(res);

res.value.then(data => {
    console.log(data.json());
});