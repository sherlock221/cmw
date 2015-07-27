/**
 * 分享邀请
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();

/**
 * 产品分享
 */
router.get("/index",function(req,res){
    var cateLogId = 0;
    res.render("help/index",{
        cateLogId : cateLogId
    });
});

router.get("/search",function(req,res){
    var cateLogId = 0;
    res.render("help/search", {
        cateLogId: cateLogId
    } );
});

router.get("/basic",function(req,res){
    var cateLogId = req.query.cateLog;
    console.log(cateLogId);
    res.render("help/basic",{
        cateLogId : cateLogId
    });
});

router.get("/detail",function(req,res){
    var id = req.query.id;
    var cateLogId =  req.query.cateLogId || 0;

    res.render("help/detail",{
        id :id,
        cateLogId : cateLogId
    });
});
module.exports = router;