"use strict";
// 泛型类
// class User {
//     username:string | undefined;
//     password:string | undefined;
//     constructor(username:string | undefined, password:string | undefined) {
//         this.username = username;
//         this.password = password;
//     }
// }
// class MysqlDb {
//     // 把类作为参数来约束数据传入的类型
//     add(user: User):boolean {
//         console.log(user); // User {username: "lisi", password: "111"}
//         return true;
//     }
// }
// let user = new User('lisi', '111');
// let db = new MysqlDb();
// console.log(db.add(user));
// class ArticleCate {
//     title:string | undefined;
//     desc:string | undefined;
//     status: number | undefined;
//     constructor(username:string | undefined, password:string | undefined, status: number | undefined) {
//         this.title = username;
//         this.desc = password;
//         this.status = status;
//     }
// }
// class MysqlDb {
//     // 把类作为参数来约束数据传入的类型
//     add(info: ArticleCate):boolean {
//         console.log(info); // ArticleCate {title: "js", desc: "入门", status: 1}
//         return true;
//     }
// }
// let artical = new ArticleCate('js', '入门', 1);
// let db = new MysqlDb();
// console.log(db.add(artical));
// 操作数据库的泛型类
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    // 把类作为参数来约束数据传入的类型
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        console.log(info);
        console.log(id);
        return true;
    };
    return MysqlDb;
}());
// 想给User表增加数据
// 定义一个User类和数据库进行映射
var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    return User;
}());
var ArticleCate = /** @class */ (function () {
    function ArticleCate(username, password, status) {
        this.title = username;
        this.desc = password;
        this.status = status;
    }
    return ArticleCate;
}());
var user = new User('lisi', '111');
var db1 = new MysqlDb();
console.log(db1.add(user));
var artical = new ArticleCate('js', '入门', 12);
var db2 = new MysqlDb();
// 只能添加ArticleCate类的数据
console.log(db2.add(artical));
// 更新数据
artical.status = 20;
console.log(db2.update(artical, 100));
