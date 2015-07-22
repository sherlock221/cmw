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

    res.render("help/index");
});

router.get("/search",function(req,res){
    res.render("help/search");
});

router.get("/basic",function(req,res){
    var cateLogId = req.query.cateLogId;
    res.render("help/basic",{
        cateLogId : cateLogId
    });
});

router.get("/detail",function(req,res){
    var id = req.query.id;
    res.render("help/detail",{
        id :id
    });
});
module.exports = router;