/**
 * 知了相关服务
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();


/**
 * 知了下载
 */
router.get("/fast/dowload",function(req,res){
    var token = req.query.token;
    res.render("zhiliao/fastDowload");
});


module.exports = router;