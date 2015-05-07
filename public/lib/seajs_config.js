/**
 * Created with IntelliJ IDEA.
 * User: sherlock221b
 * Date: 14-1-8
 * Time: 上午10:59
 * seajs 的配置文件
 */


//seajs常量
var SEAJS_CONSTANT  = {
    JS_PATH : "js/cmd/",
    CSS_PATH : "css/"
}



//seajs配置
seajs.config({

    //顶级标识
    base: "/cmw/lib",
    //设置别名
    alias: {
        //核心部分
        "$_jquery": "js/cmd/core/jquery/2.1.1/jquery-2.1.1.min.js",
        "$_zepto": "js/cmd/core/zepto/1.1.6/zepto.js",
        //cicada类库
        "cicada" : "js/cmd/cicada/main/cicada_lib.js",
        //手势
        "$_hammer" : "js/cmd/core/hammer/jquery.hammer.js",
        "hammer" : "js/cmd/core/hammer/hammer.min.js",

        "_": "js/cmd/util/underscore/1.6.0/underscore-min.js",

        //模版引擎
        "artTemplate" :"js/cmd/core/template/artTemplate/template-native.js",


        //ui部分
        "ui_textani": "js/cmd/ui/text/jquery.textillate.js",
        "ui_jq_scrollUp" : "js/cmd/ui/top/jquery.scrollUp.js",
        "ui_headroom" : "js/cmd/ui/top/headroom.js",
        "ui_waveButton" : "js/cmd/ui/wave/waves.js",


        //工具部分
        "ut_reqAnFrame": "js/cmd/util/aniamtionFrame/requestAnimationFrame.js",
        "ut_zeroClipboard" : "js/cmd/util/parse/ZeroClipboard.Core.min.js",
        "ut_loader" : "js/cmd/util/loader/loader.js",
        "ut_wx" : "js/cmd/weixin/jweixin-1.0.0.js"

    },
    //设置目录
    paths: {

    },
    //更新时间戳
    'map': [
        //[ /^(.*\.(?:css|js))(.*)$/i, '$1?20110802' ]
    ],
    // 变量配置
    vars: {
        'locale': 'zh-cn'
    },

    //预先加载
    preload: [],

    // 调试模式
    debug: false,

    // 文件编码
    charset: 'utf-8'
});

