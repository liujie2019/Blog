/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */
const express = require('express');
const User = require('./db');

// 创建一个路由
const router = express.Router();

router.get('/users', (req, res, next) => {
    User.find((err, userData) => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.json({userData});
        // res.render('Home.html', {
        //     userData: userData
        // });
    });
});
router.post('/users', (req, res, next) => {
    User.find((err, userData) => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.json({userData});
        // res.render('Home.html', {
        //     userData: userData
        // });
    });
});

router.get('/users/create', (req, res) => {
    res.render('Create.html');
});

// 新增接口
router.post('/users/create', (req, res, next) => {
    new User(req.body).save(err => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.redirect('/users');
    });
});

router.get('/users/edit', (req, res, next) => {
    User.findById(req.query.id, (err, data) => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.render('Edit.html', {
            user: data
        });
    });
});

// 编辑接口
router.post('/users/edit', (req, res, next) => {
    const userId = req.body.id.replace(/"/g, '');
    User.findByIdAndUpdate(userId, req.body, (err, data) => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.redirect('/users');
    });
});

// 删除接口
router.get('/users/delete', (req, res, next) => {
    const userId = req.query.id;
    User.findByIdAndRemove(userId, (err, data) => {
        if (err) {
            // 使用全局错误处理中间件
            return next(err);
        }
        res.redirect('/users');
    });
});
module.exports = router;
