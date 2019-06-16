// async function fn() {
//     return 'hello world';
// }

// fn().then(v => console.log(v));

// async function f() {
//     throw new Error('出错了');
// }

//   f().then(
//     v => console.log(v),
//     e => console.log(e)
//   )
const fetch = require('node-fetch');
async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
  }
  getTitle('https://tc39.github.io/ecma262/').then(
    v => console.log(v));