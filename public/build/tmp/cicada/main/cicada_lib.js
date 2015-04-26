/**
 * Created by sherlock on 15/4/26.
 * cicada 常用类库整合
 */
define("js/cmd/cicada/main/cicada_lib", [ "../storage/cicada_sg", "../storage/cicada_ck", "../storage/cicada_websql", "../animation/cicada_animation", "../template/cicada_tmp", "../web/cicada_location", "../web/cicada_page", "../os/cicada_os", "../val/cicada_jstring", "../val/cicada_jvalidate", "../other/cicada_client" ], function(require, exports, module) {
    var Cicada = {};
    //本地存储
    Cicada.lg = $.extend({}, require("../storage/cicada_sg"), require("../storage/cicada_ck"), require("../storage/cicada_websql"));
    //js动画
    Cicada.ani = $.extend({}, require("../animation/cicada_animation"));
    //模版引擎
    Cicada.tmp = $.extend({}, require("../template/cicada_tmp"));
    //web相关
    Cicada.web = $.extend({}, require("../web/cicada_location"), require("../web/cicada_page"));
    //os系统
    Cicada.os = require("../os/cicada_os");
    //字符相关
    Cicada.val = {};
    Cicada.val.jstring = require("../val/cicada_jstring");
    Cicada.val.jvalidate = require("../val/cicada_jvalidate");
    //cicada客户端
    Cicada.other = require("../other/cicada_client");
    module.exports = Cicada;
});
