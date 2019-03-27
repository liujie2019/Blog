// const mongo = require('mongodb');
// const host = 'localhost';
// const port = '27017';
// const server = new mongo.Server(host, port, {auto_reconnect: true});
// const db = new mongo.Db('node-mongo-examples', server, {safe: true});

// db.open(function(err, db) {
// 	if(err) throw err;
// 	else {
// 		console.log('连接mongodb数据库成功');
// 		db.close();
// 	}
// });
// db.on('close', function(err, db){
// 	if(err) throw err;
// 	else console.log('关闭mongodb数据库成功');
// });
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/node-mongo-examples";
 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("连接mongodb数据库成功!");
  db.close();
});