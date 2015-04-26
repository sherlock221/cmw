/**
 * OS  相关操作
 * @param key
 */
define("js/cmd/cicada/os/cicada_os", [ "../storage/cicada_sg" ], function(require, exports, module) {
    var lg = require("../storage/cicada_sg");
    var OS = {
        checkMobile: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                return {
                    type: "iOS"
                };
            } else if (ua.indexOf("qq/") > -1) {
                return {
                    message: "qq下载请点击右上角在浏览器中打开",
                    type: "other"
                };
            } else if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return {
                    message: "微信下载请点击右上角在浏览器中打开",
                    type: "other"
                };
            } else if (navigator.userAgent.match(/Android/i)) {
                return {
                    type: "Android"
                };
            }
        },
        getOS: function() {
            //定义结果变量
            var name = "Other";
            var version = "";
            //获取userAgent
            var ua = navigator.userAgent;
            //移动平台iOS探测
            var reg = /like Mac OS X|Android|Windows Phone|Symbian/gi;
            var regResult = reg.exec(ua);
            if (!regResult) {
                reg = /Mac OS X|Windows NT|Linux/gi;
                regResult = reg.exec(ua);
            }
            if (!regResult) {
                //返回UNKNOWN
                return name;
            } else {
                //操作系统检测
                switch (regResult[0]) {
                  case "like Mac os X":
                    name = "iOS";
                    reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Android":
                    name = "Android";
                    reg = /(Android)\s*(\d*[\.\d]*)/gi;
                    break;

                  case "Windows Phone":
                    name = "Windows Phone";
                    reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/gi;
                    break;

                  case "Symbian":
                    name = "Symbian";
                    reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/gi;
                    break;

                  case "Mac os X":
                    name = "os X";
                    reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Windows NT":
                    name = "Windows NT";
                    reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/gi;
                    break;

                  case "Linux":
                    name = "Linux";
                    reg = /(Linux)\s*(i*\d*)/gi;
                    break;
                }
                //获取版本号
                regResult = reg.exec(ua);
                if (regResult && regResult.length >= 3) {
                    version = regResult[2].replace(/\_+/gi, ".");
                    reg = /^\d+\.*\d*/gi;
                    regResult = reg.exec(version);
                    if (regResult) {
                        version = regResult[0];
                    }
                }
            }
            //返回操作系统名称+版本号
            return [ name, version ].join(" ");
        },
        getBrowser: function() {
            //定义结果变量
            var name = "Other";
            var version = "";
            //获取userAgent
            var ua = navigator.userAgent;
            //移动平台iOS探测
            var reg = /MSIE|Chrome|Firefox|Opera|UCBrowser|UCWEB|Safari/gi;
            var regResult = reg.exec(ua);
            if (!regResult) {
                //返回UNKNOWN
                return name;
            } else {
                //浏览器检测
                switch (regResult[0]) {
                  case "MSIE":
                    name = "IE";
                    reg = /MS(IE)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Chrome":
                    name = "Chrome";
                    reg = /(Chrome)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Firefox":
                    name = "Firefox";
                    reg = /(Firefox)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "Safari":
                    name = "Safari";
                    reg = /(Safari)[\/|\s]*(\d*[\.\d]*)/gi;
                    break;

                  case "Opera":
                    name = "Opera";
                    reg = /(Opera)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "UCBrowser":
                    name = "UC";
                    reg = /(UCBrowser)[\/|\s]+(\d*[\.\d]*)/gi;
                    break;

                  case "UCWEB":
                    name = "UC";
                    reg = /(UCWEB)[\/|\s]*(\d*[\.\d]*)/gi;
                    break;
                }
                //获取版本号
                regResult = reg.exec(ua);
                if (regResult && regResult.length >= 3) {
                    version = regResult[2].replace(/\_+/gi, ".");
                    reg = /^\d+\.*\d*/gi;
                    regResult = reg.exec(version);
                    if (regResult) {
                        version = regResult[0];
                    }
                }
            }
            //返回操作系统名称+版本号
            return [ name, version ].join(" ");
        }
    };
    module.exports = OS;
});
