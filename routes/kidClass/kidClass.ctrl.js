/**
 * 公众号
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();


/**
 * 公众号
 */
router.get("/detail",function(req,res){
    res.render("kidClass/detail");
});


module.exports = router;