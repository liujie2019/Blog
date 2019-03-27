// import router from './routes';
const Koa = require('koa');
const mongoose = require('mongoose')
const app = new Koa();
const Router = require('koa-router');
const cors = require('koa2-cors');
// 为路由加个前缀
const router = new Router({
    prefix: '/api'
});

const db = mongoose.connect("mongodb://localhost/testMongo", { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String
});
const User = mongoose.model('User', UserSchema);

router.get('/', async (ctx, next) => {
	ctx.response.body = '欢迎欢迎';
});

router.get('/addUser', async (ctx, next) => {
	// 新增数据
    const user = {
        userName: 'lisi',
        password: '123456',
        email: 'test123@qq.com'
    }
    const newUser = new User(user);
    newUser.save();
	ctx.response.body = '新增用户';
});

router.get('/userList', async (ctx, next) => {
    // const data = await User.findOne({userName: 'liujie'});
    const data = await User.find();
	const result = {
		code: 200,
		response: data,
		ts: 12345
	};
	ctx.response.body = result;
	return result;
});

app.use(cors({
    origin: (ctx) => {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(router.routes());

// 在8088端口监听
app.listen(8088);
console.log('server at port 8088');