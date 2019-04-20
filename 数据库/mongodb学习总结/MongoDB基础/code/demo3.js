/**
 * 批量插入数据
 */
const startTime = (new Date()).getTime(); // 获取开始时间
var db = connect('user'); // 连接数据库
// 批量插入数据
const temArr = [];
for(let i = 0; i < 1000; i++) {
    temArr.push({x: i});
}
db.test.insert(temArr); // 批量一次性插入
const runTime = (new Date()).getTime() - startTime; // 计算时间差
print('demo run: ' + runTime + 'ms');