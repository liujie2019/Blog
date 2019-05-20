const {userLogin, findUser, registerUser} = require('../service/user');

const checkUserLogin = async (ctx, next) => {
    const {email, password} = ctx.request.body;
    const data = await userLogin(email, password);
    ctx.session.user = data;
    return ctx.response.body = data;
};

const registerUsers = async (ctx, next) => {
    const {email, password, userName} = ctx.request.body;
    const data = await registerUser(email, password, userName);
    return ctx.response.body = data;
};

const checkUser = async (ctx, next) => {
    const {email} = ctx.request.body;
    const data = await findUser(email);
    return ctx.response.body = data;
};

module.exports = {
    checkUserLogin,
    checkUser,
    registerUsers
};
