/**
 * 提供查看次数
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();
var urllib = require('urllib');



router.get("/view",function(req,res,next){
    console.log("view");
    var url =  req.query.url;
    var num = req.query.num || 20;


    if(!url){
        return;
    }

    console.log(num);

    for(var i=1; i<=num; i++){

        urllib.request(url, function (err, data, res) {
            if (err) {
                next(err);
            }
            console.log("down..");

            if(i == num.length){
                end(i);
            }
        });
    }

    var end = function(){

    }

});




module.exports = router;