const mysql = require('mysql');
const dbConfig = require('../config/db');
// 建立连接池
const pool = mysql.createPool(dbConfig);

// 测试数据库连接
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.log('数据库连接失败');
//     }
//     console.log('数据库连接成功');
// });

const sqlQuery = (sql, query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('数据库连接失败');
                reject(err);
            }
            else {
                console.log('数据库连接成功');
                connection.query(sql, query, (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(row);
                    }
                    connection.release();
                });
            }
        });
    });
}
module.exports = {
    sqlQuery
};