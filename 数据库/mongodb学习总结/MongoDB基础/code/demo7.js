/**
 * findAndModify
 */
var customModify = {
    findAndModify: 'student', // 指定要查找的集合
    query: {name: 'lisi'},
    update: {$set: {age: 21}},
    new: true, // 更新完成，需要查看结果，如果为false不进行查看结果
    fields: {name: true, age: true, _id: false}
};
var resMsg = db.runCommand(customModify);
printjson(resMsg);