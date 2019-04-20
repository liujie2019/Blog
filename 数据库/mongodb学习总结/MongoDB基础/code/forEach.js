var db = connect('user');  // 链接数据库
var result = db.student.find(); // 声明变量result，并把查询结果赋值给result
result.forEach(result => printjson(result));