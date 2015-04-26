/**
 * location  相关操作
 * @param key
 */
define(function(require,exports,module){

    var   Page = {

        /** 获得当前屏幕宽高 **/
        getOffset: function () {
            return { width: document.body.offsetWidth, height: document.body.offsetHeight }
        },
        getBF: function () {
            var ua = navigator.userAgent.toLowerCase();
            var scene = (ua.indexOf('micromessenger')) > -1 ? 'weixin' : ((/qq\/([\d\.]+)*/).test(ua) ? 'qq' : 'web');
            return scene;
        },

        /**
         * 返回上一页
         */
        back: function () {
            window.history.go(-1);
        },
        /**
         * 分解DOM名称，已spe分割
         * @param doms  分解dom集合
         * @param spe   分隔符
         * @returns {string}
         */
        sliceName: function (doms, spe) {
            var array = new Array();
            for (var i = 0; i < doms.length; i++) {
                var $obj = $(doms[i]);
                var name = $obj.attr("name");
                array.push(name);
            }

            if (JString.isEmpty(spe)) spe = ",";

            return array.join(spe)
        }


    }

    module.exports  = Page;
});