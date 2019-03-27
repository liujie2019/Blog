const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

class UserController {
    // 用户注册
    static async signup(ctx) {
        const data = ctx.request.body;
        // 根据注册请求传来的name去数据库中查是否该用户已经注册
        const checkUser = await userModel.findOne({
            name: data.username
        });
        if (checkUser !== null) {
            return ctx.sendError('000002', '用户名已经存在');
        }
        // 如果用户名没有被注册，则新建一个用户
        const user = new userModel({
            name: data.username,
            password: crypto.createHash('md5').update(data.password).digest('hex'), // 密码加密存储
            email: data.email
        });
        const result = await user.save();
        return result !== null ? ctx.send(null, '注册成功') : ctx.sendError(null, '注册失败');
    }
    // 用户登录
    static async login(ctx) {
        const data = ctx.request.body;
        // 如果用户名或者密码为空
        if (!data.identifier || !data.password) {
            return ctx.sendError('000002', '参数不合法');
        }
        const result = await userModel.findOne({
            name: data.identifier,
            password: crypto.createHash('md5').update(data.password).digest('hex')
        });
        if (result !== null) {
            // 登录成功则生成token
            const token = jwt.sign({
                name: result.name,
                email: result.email,
                _id: result._id
            }, 'i_love_jwt', { expiresIn: 60 * 60 }); // token过期时间是1小时
            return ctx.send({token: token}, '登录成功');
        }
        else {
            return ctx.sendError('000002', '用户名或者密码错误');
        }
    }
    // 获取用户信息
    static async userInfo(ctx) {
        const data = ctx.query;
        const user = await userModel.findOne({name: data.name});
        if(user !== null) {
            const result = {
                _id: user._id,
                name: user.name,
                email: user.email
            };
            return ctx.send(result);
        }
        else {
            return ctx.sendError('000002', '获取用户信息错误');
        }
    }
}

module.exports = UserController;