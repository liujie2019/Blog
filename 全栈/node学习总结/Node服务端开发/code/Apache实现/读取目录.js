const fs = require('fs');

fs.readdir('./www', (error, files) => {
    if (error) {
        return console.log('目录不存在');
    }
    console.log(files); // [ 'a.txt', 'index.html', 'work' ]
});