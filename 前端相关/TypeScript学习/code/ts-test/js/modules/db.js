"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 定义一个操作mysql数据库的类
// 注意：要实现泛型接口，这个类也应该是一个泛型类
var MysqlDB = /** @class */ (function () {
    function MysqlDB() {
        // 构造函数里实现与数据库建立连接
    }
    MysqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDB;
}());
exports.MysqlDB = MysqlDB;
// 定义一个操作mssql数据库的类
var MsSqlDB = /** @class */ (function () {
    function MsSqlDB() {
    }
    MsSqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    return MsSqlDB;
}());
exports.MsSqlDB = MsSqlDB;
