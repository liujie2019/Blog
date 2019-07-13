const vendor1 = require('vendor1');
const test1 = require('./test1');
const test2 = require('./test2');

import(/*webpackChunkName: "async-test" */'./async-test').then(data => {
    console.log(data);
});

module.exports = 'pageA';