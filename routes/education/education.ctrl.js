/**
 * Created by sherlock on 15/7/13.
 */
var express = require('express');
var router = express.Router();
var ua   = require('mobile-agent');


/**
 * h5宣传
 */
router.get("/index",function(req,res){

    var agent = ua(req.headers['user-agent']);
    console.log(agent);
    res.render("education/index",{
        agent : agent
    });
});

module.exports = router;