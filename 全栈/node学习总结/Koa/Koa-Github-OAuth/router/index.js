const Router = require('koa-router');
const router = new Router();
const {checkOAuth} = require('../controller/oauth');

const client_id = '7e58b9b0619cba3350c7';
const authorize_uri = 'https://github.com/login/oauth/authorize';
const redirect_uri = 'http://localhost:8093/oauth/redirect';

router.get('/', (ctx, err) => {
    ctx.render('index', {
        client_id,
        authorize_uri,
        redirect_uri
    });
}).get('/oauth/redirect', checkOAuth)
.get('/home', (ctx, err) => {
    console.log('------------');
    console.log(ctx.session.user);
    console.log('------------');
    const {name: userName, location, email} = ctx.session.user;
    ctx.render('home', {
        userName,
        location,
        email
    });
});

router.use(router.routes()).use(router.allowedMethods());

module.exports = router;