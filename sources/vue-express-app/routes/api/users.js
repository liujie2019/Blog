// login & register
const express = require('express');
const bcrypt = require('bcrypt'); // 密码加密
const gravatar = require('gravatar'); // 处理用户头像
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');
const {secretOrKey} = require('../../config/constants');

/**
 * GET api/users/test
 * 返回请求的json数据
*/
router.get('/test', (req, res) => {
    res.json({name: 'lisi'});
});

/**
 * @route POST api/users/register
 * @desc 用户注册，返回请求的json数据
 * @access public(公开的接口)
*/
router.post('/register', (req, res) => {
    // console.log(req.body);
    const {email, name, password, identity} = req.body;
    // 查询数据库中是否存在该邮箱
    User.findOne({email}).then(user => {
        if (user) {
            return res.status(400).json({message: '该邮箱已经被注册!'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name,
                email,
                password,
                avatar, // 头像
                identity // 身份认证
            });
            // 密码加密
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

/**
 * @route POST api/users/login
 * @desc 用户登录，返回token jwt passport
 * @access public
*/
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    // 查询数据库
    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(404).json({message: '该用户未注册'});
        }
        const {id, name, avatar, identity} = user;
        // 密码匹配
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const rule = {
                    id,
                    name,
                    avatar,
                    identity
                };
                // 设置token有效期为一个小时
                jwt.sign(rule, secretOrKey, {expiresIn: 3600}, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                return res.status(400).json({message: '用户名和密码不匹配'});
            }
        });
    });
});

/**
 * @route  GET api/users/current
 * @desc return current user
 * @access Private(需要token验证)
*/
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {id, name, email, avatar, identity} = req.user;
    res.json({
        success: true,
        result: {
            id,
            name,
            email,
            avatar,
            identity
        }
    });
});

module.exports = router;