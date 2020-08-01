const url = require('url');
// const qs = require('querystring');

const request = {
    get url() {
        // 我们调用url方法的方式：ctx.request.url，因此this指向ctx.request
        // 而ctx.request.req.url是可以获取到url的，因此可以写成this.req.url
        return this.req.url;
    },
    // url是带有查询字符串的，path不带
    get path() {
        // 通过解析this.req.url来获取path属性
        return url.parse(this.req.url).pathname;
    }
    // get query() {
    //     console.log(url.parse(this.req.url));
    //     return url.parse(this.req.url).path;
    // }
};

module.exports = request;