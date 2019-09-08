"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../modules/db");
// 操作用户表，定义一个User类和数据表做映射
var Users = /** @class */ (function () {
    function Users(username, password) {
        this.username = username;
        this.password = password;
    }
    return Users;
}());
exports.Users = Users;
var UserModel = new db_1.MysqlDB(); // Users类作为参数来约束数据传入的类型
exports.UserModel = UserModel;
