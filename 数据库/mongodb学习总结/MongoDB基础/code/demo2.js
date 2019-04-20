/**
 * 循环插入多条数据
 */
const startTime = (new Date()).getTime(); // 获取开始时间
var db = connect('user'); // 连接数据库
// 循环插入数据
for(let i = 0; i < 1000; i++) {
    db.test.insert({x: i});
}
const runTime = (new Date()).getTime() - startTime; // 计算时间差
print('demo run: ' + runTime + 'ms');