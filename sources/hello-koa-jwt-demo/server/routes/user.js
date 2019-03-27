const Router = require('koa-router');
const userController = require('../controllers/user');

const router = new Router({
    prefix: '/api'
});

router.get('/', async (ctx, next) => {
	ctx.response.body = '欢迎欢迎';
});

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/userInfo', userController.userInfo);

module.exports = router;