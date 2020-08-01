const response = {
    // 调用的时候：ctx.response.body = 'hello'
    set body(value) {
        this.res.statusCode = 200; // 只要调用了ctx.body = 'xxx'就会成功
        this._body = value;
    },
    get body() {
        return this._body;
    }
};
module.exports = response;