/**
 * cookie路由中间件模块
*/
const express = require('express');
const router = express.Router();

// 向浏览器返回cookie数据
router.get('/test1', (req, res) => {
    // 服务器向浏览器发送数据
    // 返回会话cookie
    res.cookie('name', 'wangwu');
    // 返回持久化cookie，10秒过期
    res.cookie('age', 12, {maxAge: 1000 * 10000, httpOnly: true});
    // 重定向到cookie_test.html页面
    res.redirect('/cookie_test.html');
});

// 读取浏览器cookie数据
router.get('/test2', (req, res) => {
    console.log(req.cookies);
    // 服务器读取浏览器请求时携带的cookie数据
    const {name, age} = req.cookies;
    // res.cookie('name', 'wangwu');
    console.log('name=', name, 'age=', age);
    // 通知浏览器删除key为name的Cookie
    // res.clearCookie('name');
    // 通知浏览器删除key为name的Cookie
    res.cookie('name', '', {maxAge: 0});
    res.send(req.cookies);
});

module.exports = router;