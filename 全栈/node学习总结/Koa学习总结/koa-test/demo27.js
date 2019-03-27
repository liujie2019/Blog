const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page) {
        return  new Promise((resolve, reject) => {
            let pageUrl = `./page/${page}`;
            fs.readFile(pageUrl, 'utf-8', (err,data) => {
                console.log(444);
                if(err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        });
}

const route = async (url) => {
    let page = 'index.html';
    switch(url) {
        case '/':
            page ='index.html';
            break;
        case '/about':
            page = 'about.html';
            break;
        case '/404':
            page = '404.html';
            break;
        default:
            break;
    }
    const html = await render(page);
    return html;
}

app.use(async(ctx) => {
    const url = ctx.request.url;
    const html = await route(url);

    ctx.body = html;
})
app.listen(3000);
console.log('starting at 3000');