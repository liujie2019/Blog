/**
 * 实现跟apache一样的效果
 * 实现一个静态资源服务器
 1. 如果是文件，直接读取响应
 2. 如果是目录，读取渲染目录列表
 3. 如果是并且有该目录中有 index.html 则直接渲染目录中的 index.html
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const template = require('art-template');

const server = http.createServer(); // 创建一个server实例
const wwwDir = '/Users/liujie26/study/www';
server.on('request', (req, res) => {
    const url = req.url;
    const filePath = path.join(wwwDir + url);
    fs.stat(filePath, (error, stats) => {
        if (error) {
            return res.end('404 not found');
        }
        if (stats.isFile()) {
            fs.readFile(filePath, (error, data) => {
                if (error) {
                    return res.end('404 not found');
                }
                res.setHeader('Content-Type', 'text/html;; charset=utf-8');
                res.end(data);
            });
        } else if (stats.isDirectory()) {
            const templateStr = fs.readFileSync('./static-template.html').toString();
            // 1. 如何得到wwwDir目录列表中的文件名和目录名
            //    fs.readdir/readdirSync
            // 2. 如何将得到的文件名和目录名替换到static-template.html中
            //    2.1 在static-template.html中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
            //    2.2 根据files生成需要的HTML内容
            // 只要你做了这两件事儿，那这个问题就解决了
            const files = fs.readdirSync(filePath); // 同步读取，files是指定目录下文件
            const formatFiles = files.map(file => {
                const isFile = !!path.extname(file); // 根据是否存在后缀名判断是否为文件，展示不同的图标
                return {
                    // 当请求路径不是根路径的时候，需要加/
                    url: url === '/' ? `${url}${file}` : `${url}/${file}`,
                    file,
                    isFile
                }
            });
            // console.log(formatFiles);
            // 这里只需要使用模板引擎解析替换 data 中的模板字符串就可以了
            // 数据就是formatFiles
            // 然后去对应的static-template.html模板文件中编写你的模板语法就可以了
            const htmlStr = template.render(templateStr, {
                files: formatFiles
            });
            // 3. 发送解析替换过后的响应数据
            res.end(htmlStr);
        }
    });
});

server.listen(3000, () => {
    console.log('server is running at port 3000');
});