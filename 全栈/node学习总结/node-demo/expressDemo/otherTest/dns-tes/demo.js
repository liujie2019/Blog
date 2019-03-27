// resolve方法将一个域名解析为一组DNS记录
const dns = require('dns');
dns.resolve('www.google.com', 'A', (e, r) => {
    if(e) console.log(e);
    else console.log(r);
});