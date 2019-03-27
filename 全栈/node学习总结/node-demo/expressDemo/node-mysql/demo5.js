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
    }
});
const sql = 'DELETE FROM books WHERE id = 7';
connection.query(sql, (err, result) => {
    if(err) {
        console.log('[DELETE ERROR] -', err.message);
        return;
    }
    console.log('-------------结果是-------------');
    console.log(result.affectedRows);
    console.log('-------------------------------');
});
connection.end((err) => {
    if(err) console.log('关闭Mysql数据库失败');
    else {
        console.log('关闭Mysql数据库成功');
    }
});