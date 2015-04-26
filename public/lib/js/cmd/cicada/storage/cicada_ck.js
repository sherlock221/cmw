/**
 * Cookie 相关操作
 * @param key
 */
define(function(require,exports,module){
    var Cookie = {
        getCookie: function (key) {
            var reg = new RegExp('(^|\\s+)' + key + '=([^;]*)(;|$)');
            var regResult = document.cookie.match(reg);
            if (regResult) {
                return unescape(regResult[2]);
            } else {
                return '';
            }
        },
        setCookie: function (key, value, expires) {
            var cookieItem = key + '=' + escape(value);
            if (expires) {
                if (typeof(expires) == 'number') {
                    expires = new Date(expires);
                }
                cookieItem += ';expires=' + expires.toGMTString();
            }
            document.cookie = cookieItem;
        }
    };

    module.exports  = Cookie;
});