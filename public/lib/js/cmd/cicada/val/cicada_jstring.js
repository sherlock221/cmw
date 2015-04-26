/**
 * Created by sherlock on 15/4/26.
 */


define(function(require,exports,module){

    var JString = {

        /**
         * @description 非空判断(判断以下:undefend,null,"")
         * @param str   字符串
         * @returns {boolean} true : 空 , false  : 非空
         */
        isEmpty: function (str) {
            if (undefined == str || null == str || "" == str) {
                return true;
            }
            return false;
        },

        /**
         * @description 将字符串解析成html标签
         * @param str   带解析的字符串
         * @returns {string}  解析完成后字符串
         */
        parseHtml: function (str) {
            String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
                if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                    return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
                } else {
                    return this.replace(reallyDo, replaceWith);
                }
            }
            //str含有HTML标签的文本
            str = str.replaceAll("<", "&lt;");
            str = str.replaceAll(">", "&gt;");
            str = str.replaceAll(" ", "&nbsp;");
            str = str.replaceAll("\n", "<br>");
            str = str.replaceAll("&", "&amp;");
            return str.toString();
        },

        /**
         * @description 替换后缀名(a.mp3 -->b.mp4)
         * @param   str 原始字符
         * @param   identifier 原始标志
         * @param   target  替换标志
         * @return  {string} 替换后字符串
         */
        replaceLastChar: function (str, identifier, target) {
            var last = str.lastIndexOf(identifier);
            return (str.substring(0, last + 1) + target);
        },

        /**
         * @description  去掉字符串中所有空格 is_globa = 'g'
         * @param   str 原始字符
         * @param   identifier 原始标志
         * @param   target  替换标志
         * @result  {{去掉之后的字符串}}
         */
        trimAll: function (str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g")
                result = result.replace(/\s/g, "");
            return result;
        },
        /**
         * @description  去掉左右两边的空格
         * @param   str 原始字符
         * @param   type  l:左边  r:右边  lr : 左右两边
         * @result  {{去掉之后的字符串}}
         */
        trim: function (str, type) {
            var regs = /\s+/g;
            if (type == 'l') {
                regs = /^\s*/;
            }
            else if (type == 'r') {
                regs = /(\s*$)/g;
            }
            else if (type == 'lr') {
                regs = /^\s+|\s+$/g;
            }
            return  str.replace(regs, "");
        }
    }

    module.exports = JString;
});