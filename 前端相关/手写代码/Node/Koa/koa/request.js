const url = require('url');
// const qs = require('querystring');

const request = {
    get url() {
        // this指向ctx.request，相当于ctx.request.req.url
        return this.req.url;
    },
    get path() {
        return url.parse(this.req.url).pathname;
    }
    // get query() {
    //     console.log(url.parse(this.req.url));
    //     return url.parse(this.req.url).path;
    // }
};

module.exports = request;