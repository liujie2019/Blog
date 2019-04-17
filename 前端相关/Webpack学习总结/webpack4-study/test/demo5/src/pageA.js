import _ from 'lodash';
import(/* webpackChunkName: "common-async.js" */'./common-async').then(common => {
    console.log(common);
});
var vendor1 = require('vendor1');
var utility1 = require('./utility1');
var utility2 = require('./utility2');

module.exports = "pageA";