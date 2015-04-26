/**
 * Created by sherlock on 15/4/26.
 */


define(function(require,exports,module){

    var JValidate = {


        /**
         * 检查是否是按键值
         * @param key  按键值
         * @returns {boolean} true : 是 ,false :不是
         */
        vdIsKey: function (key) {
            var zz = /^\d$/;
            return zz.test(key);
        },

        /**
         * 判断是否为数字
         * @param num    字符
         * @returns {boolean}  true : 是 , false :不是
         */
        vdIsNum: function (num) {
            var zz = /^\d+$/;
            return zz.test(num);
        },
        /**
         * 判断是否为qq号码
         * @param str qq号
         * @returns {boolean}    true:是 ,false :不是
         */
        isQQ: function (str) {
            if (/^\d{5,14}$/.test(str)) {
                return true;
            }
            return false;
        },

        /**
         * 判断是否为手机
         * @param str 手机号
         * @returns {boolean}    true:是 ,false :不是
         */
        isPhone: function (str) {
            var reg = /^0?1[7358]\d{9}$/;
            return reg.test(str);
        },
        /**
         * 判断是否为邮箱
         * @param str 邮箱
         * @returns {boolean}    true:是 ,false :不是
         */
        isEmail: function (str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(str);
        },
        /**
         * 判断是否正整数
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isPlusNumber: function (str) {
            var reg = /^[0-9]*[1-9][0-9]*$/;
            return reg.test(str);

        },
        /**
         * 判断是否正数 不包括0
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isNumric: function (str) {
            var reg = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
            return reg.test(str);
        }
    }

    module.exports = JValidate;
});