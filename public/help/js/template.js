
define(function (require, exports, module) {

    var  cicada  = require("cicada");

    window.goPage = cicada.other.goPage;

    //检测当前浏览器
    var browser = {
        versions: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }


    window.isIOS = browser.versions.ios  ? 2 : 1;
    window.isIOSStr = browser.versions.ios ? "iOS" : "Android";


    console.log("当前系统",window.isIOS);

    window.goBack = function(){
        cicada.other.back(window.isIOSStr);
    }


    var $bdoy  =   $("body");
    //$bdoy.on("click",'.feedBack',function(){
    //
    //
    //});
    //$bdoy.on("click",'.cicada',function(){
    //    window.goPage(window.isIOSStr,"cicada");
    //});

    window.goFeedBack = function(){
        window.goPage(window.isIOSStr,"feedback");
    }

    window.goCicada = function(){
        window.goPage(window.isIOSStr,"cicada");
    }



    $(function(){
        FastClick.attach(document.body);
    });



});















