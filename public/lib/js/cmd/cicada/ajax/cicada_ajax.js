/**
 * ajax  相关操作
 * @param key
 */
define(function(require,exports,module){

    var   Ajax =  {

        /**
         * @复杂请求 post 发送json数据
         * @param time
         *            等待毫秒数
         */
        postJSON: function (url,data,successCallback,errorCallBack) {
            return $.ajax({
                'type': 'POST',
                'url': url,
                'contentType': 'application/json',
                'data': JSON.stringify(data),
                'dataType': 'json',
                'success':successCallback,
                'error' : errorCallBack
            })
        }


    }

    module.exports  = Ajax;
});