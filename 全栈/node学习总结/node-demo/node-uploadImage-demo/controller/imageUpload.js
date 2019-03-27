var express = require('express');
var router = express.Router();
var uploadModel = require('./../model/uploadModel');//上传model

router.post('/imgUpload', (req, res) => {
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin", "*");
    uploadModel.uploadPhoto(req, 'img', (err, fields, uploadPath) => {
        if(err){
            return res.json({
                errCode : 0,
                errMsg : '上传图片错误'
            });
        }
        console.log(fields);    //表单中字段信息
        console.log(uploadPath);    //上传图片的相对路径
        res.json({
            errCode : 1,
            errMsg : '上传成功',
            fields :  fields,
            uploadPath : uploadPath
        });
    });
});

module.exports = router;