const {sqlQuery} = require('../lib/mysql');

const userLogin = async (email, password) => {
    const sql = `select * from userInfo where email = '${email}' and password = '${password}'`;
    return sqlQuery(sql).then(res => {
        if (res.length === 1) {
            return {
                success: true,
                code: 200,
                data: res
            };
        } else {
            return {
                success: false,
                code: -1,
                msg: '登录失败'
            };
        }
    });
};

const findUser = async email => {
    const sql = `select * from userInfo where email = ${email}`;
    return sqlQuery(sql).then(res => {
        if (res.length === 0) {
            return {
                success: true,
                code: 200
            };
        } else {
            return {
                success: false,
                code: -2,
                msg: '用户已经存在'
            };
        }
    });
};

const registerUser = async (email, password, userName) => {
    const sql = `insert into userInfo (email, password, userName) values ('${email}', '${password}', '${userName}')`;
    return sqlQuery(sql).then(res => {
        if (res.affectedRows === 1) {
            return {
                success: true,
                code: 200,
                msg: '注册成功'
            };
        } else {
            return {
                success: false,
                code: -3,
                msg: '注册失败'
            };
        }
    });
};


module.exports = {
    userLogin,
    findUser,
    registerUser
};