const fs = require('fs');

// fs.readdir('/Library/WebServer/Documents/test', (error, files) => {
//     if (error) {
//         return console.log('目录不存在');
//     }
//     console.log(files);
//     /**
//      [ 'a.html',
//   'b.html',
//   'curl1.php',
//   'demo.php',
//   'demo2.php',
//   'link.php',
//   'static.php' ]
//     */
// });

fs.readdir('/Users/liujie26/study/www', (error, files) => {
    if (error) {
        return console.log('目录不存在');
    }
    console.log(files); // [ 'hello.txt', 'index.html', 'login' ]
});