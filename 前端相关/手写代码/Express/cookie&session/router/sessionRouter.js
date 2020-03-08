const express = require('express');
const router = express.Router();

const users = [];

/**
 * 登录-> 将用户id保存到session对象中
*/
router.get('/login', (req, res) => {
    const {name, pwd} = req.query;
    const user = {
        id: Date.now(),
        name,
        pwd
    };
    users.push(user);
    console.log('当前用户为：', user);
    // 获取session
    const session = req.session;
    // 保存用户id到session中
    session.userId = user.id;
    res.redirect('/session_test.html');
});

/**
 * 获取当期会话对应的用户信息
*/
router.get('/user_info', (req, res) => {
    // 得到session中保存的用户id
    const userId = req.session.userId;
    // 根据userId查询得到对应的用户
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json({status: 0, data: user});
    } else {
        res.json({status: 1, msg: '没有登录'});
    }
});

/**
 * 退出登录
*/

router.get('/logout', (req, res) => {
    delete req.session.userId;
    res.redirect('/session_test.html');
});

module.exports = router;