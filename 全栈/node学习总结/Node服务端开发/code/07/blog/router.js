const express = require('express');
const md5 = require('blueimp-md5');
const router = express.Router();
const User = require('./models/user');

router.get('/', (req, res) => {
    console.log(req.session.user)
    // express默认会去项目中的views目录找index.html
    res.render('index.html', {
        user: req.session.user
    });
});

// 登录
router.get('/login', (req, res) => {
    // res.render('login.html');
    res.send('hello telnet');
});

router.get('/img', (req, res) => {
    res.render('img.html');
});

router.post('/create', (req, res) => {
    res.send('haha' + req.body.name);
});

router.post('/login', (req, res, next) => {
    /**
     * 1. 获取表单数据
     * 2. 查询数据库用户和命名是否正确
     * 3. 发送响应数据
    */
   const {email, password} = req.body;
   User.findOne({
    email,
    password: md5(md5(password)) // 两次加密后再与数据库中的密码比较
   }, (err, user) => {
    if (err) {
        return next(err);
    }
    // 如果邮箱和密码匹配，则user是查询到的用户对象，否则就是null
    if (!user) {
        return res.status(200).json({
            err_code: 1,
            message: 'Email or password is invalid.'
        });
    }
    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user;
    res.status(200).json({
        err_code: 0,
        message: '登录成功'
    });
   });
});

// 注册
router.get('/register', (req, res) => {
    res.render('register.html');
});

router.post('/register', (req, res, next) => {
    /**
     * 1. 获取表单提交的数据(req.body)
     * 2. 操作数据库
     *  判断该用户是否已注册
     *  如果已经注册，不允许重复注册
     *  如果没有注册，则进行新用户注册
     * 3. 发送响应
    */
    // console.log(req.body);
    let {email, nickname, password} = req.body;
    // 判断用户是否已经注册
    User.findOne({
        // 昵称或者邮箱重复了就说明用户已存在了
        $or: [{email}, {nickname}]
    }, (err, data) => {
        if (err) {
            // next调用全局错误处理中间件进行错误处理
            return next(err);
        }
        if (data) {
            console.log(data);
            // 邮箱或者昵称已经存在
            // return res.render('register.html', {
            //     err_msg: '邮箱或者密码已存在'
            // });
            return res.status(200).json({
                err_code: 1, // 错误码
                message: 'Email or nickname already exists!'
            });
        }
        // 对密码进行md5重复加密(一层加密不安全)
        password = md5(md5(password));
        new User({email, nickname, password}).save((err, user) => {
            if (err) {
                return next(err);
            }
            // Express提供了一个响应方法：json
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器

            res.status(200).json({
                err_code: 0,
                message: 'register user success!'
            });

            // 服务端重定向只针对同步请求才有效，异步请求无效
            // 服务端重定向到登录页
            // res.redirect('/login');
        });
    });
});

// 退出登录
router.get('/logout', (req, res) => {
    req.session.user = null; // 清除登录状态
    res.redirect('/login');  // 重定向到登录页
});

// router.post('/register', async function (req, res) {
//   var body = req.body
//   try {
//     if (await User.findOne({ email: body.email })) {
//       return res.status(200).json({
//         err_code: 1,
//         message: '邮箱已存在'
//       })
//     }

//     if (await User.findOne({ nickname: body.nickname })) {
//       return res.status(200).json({
//         err_code: 2,
//         message: '昵称已存在'
//       })
//     }

//     // 对密码进行 md5 重复加密
//     body.password = md5(md5(body.password))

//     // 创建用户，执行注册
//     await new User(body).save()

//     res.status(200).json({
//       err_code: 0,
//       message: 'OK'
//     })
//   } catch (err) {
//     res.status(500).json({
//       err_code: 500,
//       message: err.message
//     })
//   }
// })

module.exports = router;