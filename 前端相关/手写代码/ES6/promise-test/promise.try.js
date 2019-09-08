const Promise = require('bluebird');

const f = () => console.log('now');
Promise.try(f);
console.log('next');