var db = connect('user');  // 链接数据库
var result = db.student.find(); // 声明变量result，并把查询结果赋值给result
// 利用游标的hasNext()进行循环输出结果
while (result.hasNext()) {
    printjson(result.next());  // 用json格式打印结果
}