var path = require('path');
var fs = require('fs');                     //文件系统
var formidable = require('formidable');     //引用formidable来解析请求，上传文件
var dateFormat = require('dateformat');     //生成时间对象，来重命名上传的图片，避免图片的重复

module.exports = {
    /**通过formdata上传图片
     * 参数1--req,express请求
     * 参数2--dirName,静态资源下的路径
     * 参数3--callback,回调函数，callback(err,fields,uploadPath),返回错误对象,表单字段和图片上传的地址
     */
    uploadPhoto : function(req, dirName, callback) {
        //上传文件
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../static', dirName);
        //保留文件扩展名
        form.keepExtensions = true;
        form.encoding = 'utf-8';
        form.onPart = function(part) {
            if (part.filename !== '') {
                // let formidable handle all non-file parts
                form.handlePart(part);
            }
        };
        //通过formidable进行图片的上传
        form.parse(req, (err, fields, files) => {
            if(err) {
                callback && callback(err, null, null);
                return;
            }
            if(!files.userfile) {    //前台上传表单的时候，文件使用的字段名是userfile,这里对文件是否为空进行判断
                var errMsg = {
                    errCode : -10,
                    errMsg : '文件为空'
                };
                callback && callback(errMsg, null, null);
                return;
            }

            //文件不为空的情况下，说明文件已经上传到我们的服务器中
            //这时，需要我们使用fs模块把我们已经上传的路径改为我们想要的位置
            //并且使用dateFormat来创建时间字符串，从而避免文件的重名
            var time = dateFormat(new Date(), "yyyymmddHHMMss");
            //files.userfile.path代表的是formidable为我们上传文件后绝对路径，通过path的extname来获取图片后缀
            var extName = path.extname(files.userfile.path);
            var newName = time + '_' + Math.floor(Math.random()*9999) + extName;    //使用dateFormat+随机数+文件后缀生成新文件名

            var oldPath = files.userfile.path;
            var newPath = path.join(__dirname, '../static', dirName, newName);
            //修改文件的名字
            fs.renameSync(oldPath,newPath);
            var finalPath = path.join('/',dirName,newName).split('\\').join('/');   //将路径中的'\'替换为'/'
            callback && callback(null, fields, finalPath);  //回掉函数返回表单字段以及图片上传的相对路径
        });
    }
};