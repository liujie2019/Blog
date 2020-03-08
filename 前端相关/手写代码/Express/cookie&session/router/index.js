const express = require('express');
const router = express.Router();

/**
 * 向浏览器返回cookie数据
*/
router.get('/test1', (req, res) => {
    // 返回会话cookie
    res.cookie('name', 'wangwu');
    // 返回持久化cookie
    res.cookie('age', 12, {maxAge: 1000 * 10});
    res.redirect('/cookie_test.html');
});

/**
 * 读取浏览器cookie数据
*/
router.get('/test2', (req, res) => {
    console.log(req.cookies);
    const {name, age} = req.cookies;
    // res.cookie('name', 'wangwu');
    console.log('name=', name, 'age=', age);
    res.send(req.cookies);
});


module.exports = router;