const Router = require('koa-router');
const userController = require('../controller/user');

const userRouter = new Router();

userRouter.get('/login', (ctx, err) => {
    ctx.render('login');
}).get('/register', (ctx, err) => {
    ctx.render('register');
}).post('/login', userController.checkUserLogin)
    .post('/register', userController.registerUsers);

module.exports = userRouter;
