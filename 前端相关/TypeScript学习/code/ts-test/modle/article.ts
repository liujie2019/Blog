import {MysqlDB} from '../modules/db';
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

let articalModel = new MysqlDB<ArticleCate>();

export {
    ArticleCate,
    articalModel
}