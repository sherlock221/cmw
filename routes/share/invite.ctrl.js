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
router.get("/product",function(req,res){
    var uId = req.query.uId;
    console.log(uId);
    res.render("share/invite/invite-product",{uId:uId});
});

/**
 * 班级分享
 */
router.get("/class",function(req,res){
    var classId = req.query.classId;
    var uId    = req.query.uId;
    res.render("share/invite/invite-class",{
        classId : classId,
        uId : uId
    });
});


/**
 * 未注册
 */
router.get("/download",function(req,res){
    var phone = req.query.phone;
    var uId  = req.query.uId;
    console.log(phone,uId);
    res.render("share/invite/download",{
        phone : phone,
        uId : uId
    });
});

/**
 * 已经注册
 */
router.get("/register",function(req,res){
    res.render("share/invite/share");
});


module.exports = router;