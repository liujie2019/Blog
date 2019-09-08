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
class MysqlDb<T> {
    // 把类作为参数来约束数据传入的类型
    add(info: T):boolean {
        console.log(info);
        return true;
    }
    update(info: T, id: number):boolean {
        console.log(info);
        console.log(id);
        return true;
    }
}

// 想给User表增加数据
// 定义一个User类和数据库进行映射
class User {
    username:string | undefined;
    password:string | undefined;
    constructor(username:string | undefined, password:string | undefined) {
        this.username = username;
        this.password = password;
    }
}

class ArticleCate {
    title:string | undefined;
    desc:string | undefined;
    status: number | undefined;
    constructor(username:string | undefined, password:string | undefined, status: number | undefined) {
        this.title = username;
        this.desc = password;
        this.status = status;
    }
}

let user = new User('lisi', '111');

let db1 = new MysqlDb<User>();

console.log(db1.add(user));

let artical = new ArticleCate('js', '入门', 12);

let db2 = new MysqlDb<ArticleCate>();
// 只能添加ArticleCate类的数据
console.log(db2.add(artical));
// 更新数据
artical.status = 20;
console.log(db2.update(artical, 100));
