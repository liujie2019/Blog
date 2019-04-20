/**
 * 200万数据普通检索
 */
var startTime = new Date().getTime(); // 得到程序开始运行的时间
var db = connect('user'); // 链接数据库
// var res = db.randomInfo.find({username: 'n7wl5kq'}); // 根据用户名查找用户
// var res = db.randomInfo.find({username: 'n7wl5kq', randNum0: 754417}); // 根据用户名和randNum0查找用户
var res = db.randomInfo.find({username: 'n7wl5kq', randNum0: 754417}).hint({randNum0:1}); // 指定优先使用randNum0索引查询
res.forEach(item => printjson(item)); // 循环输出
var runTime = new Date().getTime() - startTime; // 得到程序运行时间
print('This run time is: ' + runTime + 'ms');  //打印出运行时间