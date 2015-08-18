
var express = require('express');
var router = express.Router();

var urllib = require('urllib');
var formidable = require("formidable");
var fs =   require("fs");
var util = require('util');

var formstream = require('formstream');

//缓存目录
var UPLOAD_DIR = "public/upload/";
//post给 file
//var url = "http://imzhiliao.com:10000/file/upload/savefile.shtml";
var url = "http://123.59.108.126:8080/file/upload/saveKsFile.shtml";


/**
 * 文件上传
 */
router.post("/file/editor",function(req,res,next) {

    //console.log(req);

    //创建上传表单
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = UPLOAD_DIR;
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //最大文件大小

    //解析form
    form.parse(req, function (err, fields, files) {
        if (err) {
            sendError(res,err);
            return;
        }
        var extName = "";  //后缀名
        switch (files.upfile.type) {
            case "image/pjpeg":
                extName = "jpg";
                break;
            case "image/jpeg":
                extName = "jpg";
                break;
            case "image/png":
                extName = "png";
                break;
            case "image/x-png":
                extName = "png";
                break;
        }

        if (extName.length == 0) {
            var err = "只支持png和jpg格式图片";
            sendError(res,err);
            return;
        }

        var avatarName = Math.random() + extName;
        var newPath = UPLOAD_DIR+ avatarName;
        console.log(newPath);

        //知了file服务
        postCicadaFile(fields,files,res);

    });

});


/**
 * 知了file服务
 */
var   postCicadaFile = function(fields,files,res){

    var form = formstream();
    form.file('file', files.upfile.path);

    urllib.request(url, {
        method: 'POST',
        headers: form.headers(),
        stream: form
    },function(err,data,tp){
        if(err){
            sendError(res,err);
            return;
        }
        var json = JSON.parse(data.toString());
        var extJson = {
            "state" : "SUCCESS",
            "url" : json.data.url,
            "title" : "",
            "original" : ""
        };

        res.send('<script>window.parent.postMessage('+JSON.stringify(extJson)+',"*")</script>');
        //删除缓存
        fs.unlink(files.upfile.path);
        console.log("完成上传",json);

    });

}


var sendError = function(res,err){
    console.log(err);
    res.send(JSON.stringify({
        "state":"ERROR",
        "msg" : err
    }));
}

module.exports = router;