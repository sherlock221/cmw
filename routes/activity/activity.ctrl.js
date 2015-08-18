/**
 * 分享邀请
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();


router.get("/activity",function(req,res){
    var num = req.query.num;
    res.render("activity/activity"+num);
});

module.exports = router;