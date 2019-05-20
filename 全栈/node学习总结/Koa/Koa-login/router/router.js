const Router = require('koa-router');
const userRouter = require('./userRouter');
const router = new Router();

router.get('/', (ctx, err) => {
    console.log(ctx.session);
    ctx.render('home.html', {
        user: ctx.session.user
    });
});

router.use(userRouter.routes()).use(router.allowedMethods());

module.exports = router;