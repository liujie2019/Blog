const User = require("./user.js");

/**
 * 插入
function insert() {

    const user = new User({
        username : 'lisi',// 用户账号
        userpwd: '123456',// 密码
        userage: 20, // 年龄
        logindate : new Date() // 最近登录时间
    });

    user.save((err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    });
}
insert();
*/
/**
 *
 * 更新
 */
function update() {
    const wherestr = {'username': 'lisi'};
    const updatestr = {'userage': '25'};

    User.update(wherestr, updatestr, (err, res) => {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

update();