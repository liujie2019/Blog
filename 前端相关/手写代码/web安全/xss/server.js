const fs = require('fs');
const path = require('path');
const Koa = require('koa');


const app = new Koa();

app.listen(8088, () => {
    console.log('Server is running at 8088');
});