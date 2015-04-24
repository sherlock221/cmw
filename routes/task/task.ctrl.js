/**
 * 获得活跃值任务
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();


/**
 * 任务列表
 */
router.get("/list",function(req,res){
    var token = req.query.token;
    res.render("task/taskList",{token:token});
});


module.exports = router;