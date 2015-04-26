/**
 * HTML5 storage 相关操作
 * @param key
 */
define(function(require,exports,module){

        var  SG = {
            /**
             * 获得sessionStorage 对象
             * @param key
             */
            getSgObj: function (key) {
                var obj = window.sessionStorage.getItem(key);
                return JSON.parse(obj);
            },

            /**
             * 设置sessionStorage 对象
             * @param key
             */
            setSgObj: function (key, value) {
                return window.sessionStorage.setItem(key, JSON.stringify(value));
            },
            getSg: function (key) {
                return window.sessionStorage.getItem(key);
            },
            setSg: function (key, value) {
                window.sessionStorage.setItem(key, value);
            },
            remove: function (key) {
                window.sessionStorage.removeItem(key);
            },
            removeSg: function (key) {
                window.sessionStorage.removeItem(key);
            },
            loading: function (toggle) {
                if (toggle) {
                    $ionicLoading.show();
                }
                else {
                    $ionicLoading.hide();
                }
            },
            getLgObj: function (key) {
                var obj = window.localStorage.getItem(key);
                return JSON.parse(obj);
            },
            setLgObj: function (key, value) {
                return window.localStorage.setItem(key, JSON.stringify(value));
            },
            getLg: function (key) {
                return window.localStorage.getItem(key);
            },
            setLg: function (key, value) {
                window.localStorage.setItem(key, value);
            },
            removeLg: function (key) {
                window.localStorage.removeItem(key);
            }
        }


    module.exports  = SG;
});