/**
 * 使用js文件写mongo命令
 */
const userName = 'liujie';
const timeStamp = Date.parse(new Date()); // 声明登录时的时间戳
const jsonData = {"loginUser": userName, "loginTime": timeStamp};
var db = connect('user'); // 连接数据库
db.login.insert(jsonData); // 插入数据

print('user print success'); // 成功则打印信息