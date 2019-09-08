import {MysqlDB} from '../modules/db';

// 操作用户表，定义一个User类和数据表做映射
class Users {
    username:string | undefined;
    password:string | undefined;
    constructor(username:string | undefined, password:string | undefined) {
        this.username = username;
        this.password = password;
    }
}

let UserModel = new MysqlDB<Users>(); // Users类作为参数来约束数据传入的类型
export {
    UserModel,
    Users
}