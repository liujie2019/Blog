const axios = require('axios');
const client_id = '7e58b9b0619cba3350c7';
const client_secret = '0fb00d2561187d31bc227ecb0c0fb7c7ec9f3394';

const checkOAuth = async ctx => {
    const requestToken = ctx.query.code;
    console.log(`request token: ${requestToken}`);
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${client_id}&` +
            `client_secret=${client_secret}&` +
            `code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    });
    const accessToken = tokenResponse.data.access_token;
    console.log(`access token: ${accessToken}`);

    const userData = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`
        }
    });
    // 将获取到的用户信息存储在session中
    ctx.session.user = userData.data;
    // 重定向到首页
    ctx.redirect('/home');
};

exports.checkOAuth = checkOAuth;