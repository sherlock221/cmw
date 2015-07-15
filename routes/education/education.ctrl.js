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
    var o_agent = req.headers['user-agent'];

    var agent = ua(o_agent);


    //检测微信和qq
    if(/MicroMessenger/.test(o_agent) ||  /QQ/.test(o_agent)){
        agent.tx = true;
    }
    else{
        agent.tx =false;
    }

    res.render("education/index",{
        agent : agent
    });

    console.log(agent);
});


router.get("/test",function(req,res){
    var agent = ua(req.headers['user-agent']);
    console.log(agent);
    res.render("education/test",{
        agent : agent
    });
});

module.exports = router;