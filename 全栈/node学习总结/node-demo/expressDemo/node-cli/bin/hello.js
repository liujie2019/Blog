#! /usr/bin/env node
// console.log('hello');
console.log(process.argv);
const argv = process.argv.slice(2);
console.log(argv);
const name = argv[0];
console.log(`hello, ${name}`);