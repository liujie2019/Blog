// write.js文件

// 从db.js那里导入query方法
const query = require('./db');
const debug = require('debug')('movie:write');
// 写入数据库的方法
const write = async movies => {
    debug('开始写入电影');
    // movies即为read.js读取出来的结果数组
    for (let movie of movies) {
        // 通过query方法去查询一下是不是已经在数据库里存过了
        let oldMovie = await query('SELECT * FROM douban_movie WHERE id=? LIMIT 1', [movie.id]);

        // sql查询语句返回的是一个数组，如果不为空数组的话就表示有数据存过
        // 直接就进行更新操作了
        if (Array.isArray(oldMovie) && oldMovie.length) {
            // 更新movies表里的数据
            let old = oldMovie[0];
            await query('UPDATE douban_movie SET name=?,href=?,image=?,score=? WHERE id=?', [movie.name, movie.href, movie.image, movie.score, old.id]);
        } else {
            // 插入内容到movies表
            await query('INSERT INTO douban_movie(id,name,href,image,score) VALUES(?,?,?,?,?)', [movie.id, movie.name, movie.href, movie.image, movie.score]);
        }

        debug(`正在写入电影：${movie.name}`);
    }
};

module.exports = write;
