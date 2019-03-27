// reverse方法将一个IP地址反解为对应的域名
const dns = require('dns');
dns.reverse('202.165.102.205', (err, domain) => {
    if(err) console.log(err);
    else console.log(domain);
});