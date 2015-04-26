


define(function(require,exports,module){


    //引入dom选择器 zepto
    var $ = require("$_zepto");
    //加入触摸支持
    require("$_hammer")($);
    //全局暴露$
    window.$ = $;


    var TemplateAjax = {
        getShareData : function(){
            var result  ="";
            $.ajax({
                type: "get",
                url: "/task/json/share.json",
                async : false,
                success : function(res){
                    result  = res;
                }
            });
            return result;
        }
    };

    var TemplateEvent = {

        init : function(){
            //wavesBtn初始化
            if(window.Waves){
                Waves.displayEffect();
            }

            TemplateEvent.response();
            TemplateEvent.weixinShare();
        },

        response : function(){
            (function (doc, win) {
                var docEl = doc.documentElement,
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function () {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                    };
                if (!doc.addEventListener) return;
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
            })(document, window)
        },

        weixinShare : function(){

        }
    };



    $(function(){
        TemplateEvent.init();
    });


});

