const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const cors = require('koa2-cors');
// 获取post请求参数
const bodyParser = require('koa-bodyparser');
const Model = require('./UserModel.js');

// 为路由加个前缀
const router = new Router({
    prefix: '/api'
});

router.get('/', async (ctx, next) => {
	ctx.response.body = '欢迎欢迎';
});
// 新增用户
router.post('/addUser', async (ctx, next) => {
    const postData = ctx.request.body;
    const user = {
        username: postData.username,
        age: postData.age,
        address: postData.address,
        time: new Date()
    };
    const newUser = new Model(user);
    newUser.save();
    const result = {
		code: 200,
		meassage: '新增用户成功'
    };
    ctx.response.body = result;
    return result;
});
// 获取用户列表
router.get('/userList', async (ctx, next) => {
    const data = await Model.find();
	const result = {
		code: 200,
		data: data
	};
	ctx.response.body = result;
	return result;
});
// 编辑用户信息
router.put('/editUser', async (ctx, next) => {
    const postData = ctx.request.body;
    const result = {
        code: 200,
        meassage: '编辑用户信息成功'
    };
    Model.updateOne({_id: postData.id}, {$set: postData}, (err, res) => {
        if (err) {
            console.error(err);
        }
    });
    ctx.response.body = result;
    return result;
});
// 删除用户信息
router.delete('/deleteUser', async (ctx, next) => {
    const postData = ctx.query;
    const result = {
        code: 200,
        meassage: '删除用户成功'
    };
    Model.deleteOne({_id: postData.id}, (err, res) => {
        if (err) {
            console.error(err);
        }
    });
    ctx.response.body = result;
    return result;
});
// 设置跨域
app.use(cors({
    origin: (ctx) => {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; // 这样就能只允许http://localhost:8080这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());

app.use(router.routes());
app.listen(8088);
console.log('server started at port 8088!');