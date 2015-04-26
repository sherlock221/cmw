/**
 * 动画  相关操作
 */
define(function(require,exports,module){

    /**
     * transition 动画结束
     * @returns {*}
     */
    var animationEnd = function (dom, callBack) {
        var el = document.createElement('div');
        var transEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'animation': 'animationend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                dom.addEventListener(transEndEventNames[name], callBack);
                break;
            }
        }
    };

    /**
     * transition 动画结束
     * @returns {*}
     */
    var transitionEnd = function (dom, callBack) {
        var el = document.createElement('div');
        var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd otransitionend',
            'transition': 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                dom.addEventListener(transEndEventNames[name], callBack);
                break;
            }
        }
        return false;
    };

    var AN = {
        /**
         * 数字滚动
         * @param $dom
         * @returns {number}
         */
        numberScroll: function ($dom) {
            var a_num = $dom.attr("data-num") * 1;
            var a = 1;
            var crear_a = ""
            var change_a = function () {
                if (a < a_num) {
                    a += 4;
                    $dom.text(a);
                }
                else {
                    $dom.text(a_num);
                    clearInterval(crear_a);
                }

            }
            crear_a = setInterval(change_a, (3000 / a_num));
            return crear_a;
        },


        /**
         * js动画引擎
         * @returns {Function}
         */
        reAF: function () {
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (callback) {
                    return setTimeout(callback, 1000 / 60);
                };

            return requestAnimationFrame;
        },

        clAF: function () {
            var cancelAnimationFrame = window.cancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                function (callback) {
                    return clearTimeout(callback, 1000 / 60);
                };

            return cancelAnimationFrame;
        },


        animateEnd: animationEnd,
        transitionEnd: transitionEnd

    }




    module.exports  = AN;
});