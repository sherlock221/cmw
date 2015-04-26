/**
 * Created by sherlock on 15/4/26.
 * cicada 常用类库整合
 */

define(function(require,exports,module){

    var Cicada = {};

    //本地存储
    Cicada.lg =  $.extend({},require("../storage/cicada_sg"),require("../storage/cicada_ck"),require("../storage/cicada_websql"));

    //js动画
    Cicada.ani = $.extend({},require("../animation/cicada_animation"));

    //模版引擎
    Cicada.tmp = $.extend({},require("../template/cicada_tmp"));

    //web相关
    Cicada.web = $.extend({},require("../web/cicada_location"),require("../web/cicada_page"));

    //os系统
    Cicada.os  =  require("../os/cicada_os");

    //字符相关
    Cicada.val = {};
    Cicada.val.jstring =  require("../val/cicada_jstring");
    Cicada.val.jvalidate = require("../val/cicada_jvalidate");

    //cicada客户端
    Cicada.other  =  require("../other/cicada_client");

    module.exports = Cicada;

});
