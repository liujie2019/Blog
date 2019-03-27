// lookup方法将一个域名转换为一个IP地址
const dns = require('dns');
dns.lookup('google.com', 4, (err, address) => {
    if(err) console.log(err);
    else console.log(address);
});