// // 数据库泛型接口
// interface DB<T> {
//     get(id:number):any[];
//     add(info:T):boolean;
//     update(info:T, id:number):boolean;
//     delete(id:number):boolean;
// }
// // 定义一个操作mysql数据库的类
// // 注意：要实现泛型接口，这个类也应该是一个泛型类
// class MysqlDB<T> implements DB<T> {
//     constructor() {
//         // 构造函数里实现与数据库建立连接
//     }

//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
//     add(info: T): boolean {
//         console.log(info);
//         // return true;
//         throw new Error("Method not implemented.");
//     }
//     update(info: T, id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
// }

// // 定义一个操作mssql数据库的类
// class MsSqlDB<T> implements DB<T> {
//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
//     add(info: T): boolean {
//         console.log(info);
//         // return true;
//         throw new Error("Method not implemented.");
//     }
//     update(info: T, id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
// }

// // 操作用户表，定义一个User类和数据表做映射
// class User {
//     username:string | undefined;
//     password:string | undefined;
//     constructor(username:string | undefined, password:string | undefined) {
//         this.username = username;
//         this.password = password;
//     }
// }

// let user = new User('lisi123', '123');
// let oMysql = new MysqlDB<User>(); // User类作为参数来约束数据传入的类型
// oMysql.add(user);

// let oMssql = new MsSqlDB<User>(); // User类作为参数来约束数据传入的类型
// oMssql.add(user);