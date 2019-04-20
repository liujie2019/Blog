/**
 * db.runCommand
 */
db.student.update({sex:1},{$set:{class:'三年级2班'}},false,true);
var resMsg = db.runCommand({getLastError:1});
printjson(resMsg);