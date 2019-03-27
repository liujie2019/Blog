const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'node_test',
    user: 'root',
    password: 'root'
});
connection.connect((err) => {
    if(err) console.log('连接Mysql数据库失败');
    else {
        console.log('连接Mysql数据库成功');
        connection.end((err) => {
            if(err) console.log('关闭Mysql数据库失败');
            else {
                console.log('关闭Mysql数据库成功');
            }
        });
    }
});