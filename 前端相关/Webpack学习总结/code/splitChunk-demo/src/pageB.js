const vendor2 = require('vendor2');
const test2 = require('./test2');
const test3 = require('./test3');
import(/*webpackChunkName: "async-test" */'./async-test').then(data => {
    console.log(data);
});
module.exports = 'pageB';