"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../modules/db");
var ArticleCate = /** @class */ (function () {
    function ArticleCate(username, password, status) {
        this.title = username;
        this.desc = password;
        this.status = status;
    }
    return ArticleCate;
}());
exports.ArticleCate = ArticleCate;
var articalModel = new db_1.MysqlDB();
exports.articalModel = articalModel;
