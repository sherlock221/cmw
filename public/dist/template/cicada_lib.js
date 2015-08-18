/**
 * ajax  相关操作
 * @param key
 */
define("js/cmd/cicada/ajax/cicada_ajax", [], function(require, exports, module) {
    var Ajax = {
        /**
         * @复杂请求 post 发送json数据
         * @param time
         *            等待毫秒数
         */
        postJSON: function(url, data, successCallback, errorCallBack) {


            return $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: "json",
                success: successCallback,
                error: errorCallBack
            });
        }
    };
    module.exports = Ajax;
});

/**
 * 动画  相关操作
 */
define("js/cmd/cicada/animation/cicada_animation", [], function(require, exports, module) {
    /**
     * transition 动画结束
     * @returns {*}
     */
    var animationEnd = function(dom, callBack) {
        var el = document.createElement("div");
        var transEndEventNames = {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend"
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
    var transitionEnd = function(dom, callBack) {
        var el = document.createElement("div");
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
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
        numberScroll: function($dom) {
            var a_num = $dom.attr("data-num") * 1;
            var a = 1;
            var crear_a = "";
            var change_a = function() {
                if (a < a_num) {
                    a += 4;
                    $dom.text(a);
                } else {
                    $dom.text(a_num);
                    clearInterval(crear_a);
                }
            };
            crear_a = setInterval(change_a, 3e3 / a_num);
            return crear_a;
        },
        /**
         * js动画引擎
         * @returns {Function}
         */
        reAF: function() {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
                return setTimeout(callback, 1e3 / 60);
            };
            return requestAnimationFrame;
        },
        clAF: function() {
            var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function(callback) {
                return clearTimeout(callback, 1e3 / 60);
            };
            return cancelAnimationFrame;
        },
        animateEnd: animationEnd,
        transitionEnd: transitionEnd
    };
    module.exports = AN;
});

/**
 * Created by sherlock on 15/4/26.
 * cicada 常用类库整合
 */
define("js/cmd/cicada/main/cicada_lib", [ "../storage/cicada_sg", "../storage/cicada_ck", "../storage/cicada_websql", "../animation/cicada_animation", "../template/cicada_tmp", "../web/cicada_location", "../web/cicada_page", "../os/cicada_os", "../ajax/cicada_ajax", "../val/cicada_jstring", "../val/cicada_jvalidate", "../other/cicada_client" ], function(require, exports, module) {
    var Cicada = {};
    //本地存储
    Cicada.lg = $.extend({}, require("../storage/cicada_sg"), require("../storage/cicada_ck"), require("../storage/cicada_websql"));
    //js动画
    Cicada.ani = $.extend({}, require("../animation/cicada_animation"));
    //模版引擎
    Cicada.tmp = $.extend({}, require("../template/cicada_tmp"));
    //web相关
    Cicada.web = $.extend({}, require("../web/cicada_location"), require("../web/cicada_page"));
    //os系统
    Cicada.os = require("../os/cicada_os");
    //ajax系统
    Cicada.ax = require("../ajax/cicada_ajax");
    //字符相关
    Cicada.val = {};
    Cicada.val.jstring = require("../val/cicada_jstring");
    Cicada.val.jvalidate = require("../val/cicada_jvalidate");
    //cicada客户端
    Cicada.other = require("../other/cicada_client");
    module.exports = Cicada;
});

/**
 * OS  相关操作
 * @param key
 */
define("js/cmd/cicada/os/cicada_os", [ "../storage/cicada_sg" ], function(require, exports, module) {
    var lg = require("../storage/cicada_sg");
    var OS = {
        checkMobile: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            //ios
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                return {
                    type: "iOS"
                };
            } else if (ua.indexOf("qq/") > -1) {
                return {
                    message: "qq下载请点击右上角在浏览器中打开",
                    type: "third"
                };
            } else if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return {
                    message: "微信下载请点击右上角在浏览器中打开",
                    type: "third"
                };
            } else if (navigator.userAgent.match(/Android/i)) {
                return {
                    type: "Android"
                };
            } else {
                return {
                    type: "other"
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

/**
 * cicada client
 * @param key
 */
define("js/cmd/cicada/other/cicada_client", [ "../web/cicada_location" ], function(require, exports, module) {
    var Location = require("../web/cicada_location");
    var Client = {
        openCiacada: function() {
            //            var isrefresh =  Util.location.getParams().refresh;
            //            if(isrefresh == 1) {
            //                return
            //            }
            window.location.href = "http://cicada://public/page/index";
        },
        sharePgaeByUserId: function(type, url, sjson) {
            if (type == "iOS") {
                sjson.url = url;
                var temp = JSON.stringify(sjson);
                var encodeJson = encodeURI(temp);
                console.log("ios", CONSTANT_TASK.cicada_share_url.ios_share_url + "?json=" + encodeJson);
                window.location.href = CONSTANT_TASK.cicada_share_url.ios_share_url + "?json=" + encodeJson;
            } else {
                var temp = JSON.stringify(sjson);
                console.log("android", temp);
                window.cicada.sharePageByUserId(url, temp);
            }
        },
        goPage: function(type, viewName) {
            var params = [ {
                key: "viewName",
                value: viewName
            } ];
            if (type == "iOS") {
                var params = Location.encodeParam(params);
                console.log("ios", "cicada://cicada/page/goPage" + params);
                window.location.href = "cicada://cicada/page/goPage" + params;
            } else {
                window.cicada.goPage(viewName);
            }
        },
        back: function(type) {
            if (type == "iOS") {
                console.log("ios", "cicada://cicadaStore/back");
                window.location.href = "cicada://cicadaStore/back";
            } else {
                window.cicadaStore.back();
            }
        }
    };
    module.exports = Client;
});

/**
 * Cookie 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_ck", [], function(require, exports, module) {
    var Cookie = {
        getCookie: function(key) {
            var reg = new RegExp("(^|\\s+)" + key + "=([^;]*)(;|$)");
            var regResult = document.cookie.match(reg);
            if (regResult) {
                return unescape(regResult[2]);
            } else {
                return "";
            }
        },
        setCookie: function(key, value, expires) {
            var cookieItem = key + "=" + escape(value);
            if (expires) {
                if (typeof expires == "number") {
                    expires = new Date(expires);
                }
                cookieItem += ";expires=" + expires.toGMTString();
            }
            document.cookie = cookieItem;
        }
    };
    module.exports = Cookie;
});

/**
 * HTML5 storage 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_sg", [], function(require, exports, module) {
    var SG = {
        /**
             * 获得sessionStorage 对象
             * @param key
             */
        getSgObj: function(key) {
            var obj = window.sessionStorage.getItem(key);
            return JSON.parse(obj);
        },
        /**
             * 设置sessionStorage 对象
             * @param key
             */
        setSgObj: function(key, value) {
            return window.sessionStorage.setItem(key, JSON.stringify(value));
        },
        getSg: function(key) {
            return window.sessionStorage.getItem(key);
        },
        setSg: function(key, value) {
            window.sessionStorage.setItem(key, value);
        },
        remove: function(key) {
            window.sessionStorage.removeItem(key);
        },
        removeSg: function(key) {
            window.sessionStorage.removeItem(key);
        },
        loading: function(toggle) {
            if (toggle) {
                $ionicLoading.show();
            } else {
                $ionicLoading.hide();
            }
        },
        getLgObj: function(key) {
            var obj = window.localStorage.getItem(key);
            return JSON.parse(obj);
        },
        setLgObj: function(key, value) {
            return window.localStorage.setItem(key, JSON.stringify(value));
        },
        getLg: function(key) {
            return window.localStorage.getItem(key);
        },
        setLg: function(key, value) {
            window.localStorage.setItem(key, value);
        },
        removeLg: function(key) {
            window.localStorage.removeItem(key);
        }
    };
    module.exports = SG;
});

/**
 * HTML5 websql 相关操作
 * @param key
 */
define("js/cmd/cicada/storage/cicada_websql", [], function(require, exports, module) {
    var WebSql = {};
    module.exports = WebSql;
});

define("js/cmd/cicada/template/cicada_tmp", [], function(require, exports, module) {
    var TMP = {
        /**
         * 渲染模板
         *
         * @param $dom
         * @param data
         * @param $template
         */
        refreshTemplate: function($dom, data, $template, append) {
            // 原生方法
            var source = $template.html();
            // 预编译模板
            var tm = tp.compile(source);
            // 匹配json内容
            var html = tm(data);
            // // 输入模板
            if (append) $dom.append(html); else $dom.html(html);
        }
    };
    module.exports = TMP;
});

/**
 * Created by sherlock on 15/4/26.
 */
define("js/cmd/cicada/val/cicada_jstring", [], function(require, exports, module) {
    var JString = {
        /**
         * @description 非空判断(判断以下:undefend,null,"")
         * @param str   字符串
         * @returns {boolean} true : 空 , false  : 非空
         */
        isEmpty: function(str) {
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
        parseHtml: function(str) {
            String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
                if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                    return this.replace(new RegExp(reallyDo, ignoreCase ? "gi" : "g"), replaceWith);
                } else {
                    return this.replace(reallyDo, replaceWith);
                }
            };
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
        replaceLastChar: function(str, identifier, target) {
            var last = str.lastIndexOf(identifier);
            return str.substring(0, last + 1) + target;
        },
        /**
         * @description  去掉字符串中所有空格 is_globa = 'g'
         * @param   str 原始字符
         * @param   identifier 原始标志
         * @param   target  替换标志
         * @result  {{去掉之后的字符串}}
         */
        trimAll: function(str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g") result = result.replace(/\s/g, "");
            return result;
        },
        /**
         * @description  去掉左右两边的空格
         * @param   str 原始字符
         * @param   type  l:左边  r:右边  lr : 左右两边
         * @result  {{去掉之后的字符串}}
         */
        trim: function(str, type) {
            var regs = /\s+/g;
            if (type == "l") {
                regs = /^\s*/;
            } else if (type == "r") {
                regs = /(\s*$)/g;
            } else if (type == "lr") {
                regs = /^\s+|\s+$/g;
            }
            return str.replace(regs, "");
        }
    };
    module.exports = JString;
});

/**
 * Created by sherlock on 15/4/26.
 */
define("js/cmd/cicada/val/cicada_jvalidate", [], function(require, exports, module) {
    var JValidate = {
        /**
         * 检查是否是按键值
         * @param key  按键值
         * @returns {boolean} true : 是 ,false :不是
         */
        vdIsKey: function(key) {
            var zz = /^\d$/;
            return zz.test(key);
        },
        /**
         * 判断是否为数字
         * @param num    字符
         * @returns {boolean}  true : 是 , false :不是
         */
        vdIsNum: function(num) {
            var zz = /^\d+$/;
            return zz.test(num);
        },
        /**
         * 判断是否为qq号码
         * @param str qq号
         * @returns {boolean}    true:是 ,false :不是
         */
        isQQ: function(str) {
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
        isPhone: function(str) {
            var reg = /^0?1[7358]\d{9}$/;
            return reg.test(str);
        },
        /**
         * 判断是否为邮箱
         * @param str 邮箱
         * @returns {boolean}    true:是 ,false :不是
         */
        isEmail: function(str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(str);
        },
        /**
         * 判断是否正整数
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isPlusNumber: function(str) {
            var reg = /^[0-9]*[1-9][0-9]*$/;
            return reg.test(str);
        },
        /**
         * 判断是否正数 不包括0
         * @param str 数值
         * @returns {boolean}    true:是 ,false :不是
         */
        isNumric: function(str) {
            var reg = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
            return reg.test(str);
        }
    };
    module.exports = JValidate;
});

/**
 * location  相关操作
 * @param key
 */
define("js/cmd/cicada/web/cicada_location", [], function(require, exports, module) {
    var Location = {
        getParams: function() {
            var url = location.search;
            //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //编码uri
        encodeParam: function(paramList) {
            var baseUrl = "";
            for (var i = 0; i < paramList.length; i++) {
                var value = paramList[i].value;
                if (i == 0) {
                    baseUrl += "?" + paramList[i].key + "=" + encodeURI(value);
                } else {
                    value = paramList[i].value;
                    baseUrl += "&" + paramList[i].key + "=" + encodeURI(value);
                }
            }
            return baseUrl;
        },
        getParamByName: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            {
                return null;
            }
        },
        /**
         * @description 等待几秒后 刷新页面
         * @param time
         *            等待毫秒数
         */
        reloadPage: function(time) {
            var fn = function() {
                window.location = window.location;
            };
            if (!time) {
                time = 0;
            }
            setTimeout(fn, time);
        },
        /**
         * @description 等待几秒 跳转页面
         * @param url
         *            跳转路径
         * @param time
         *            等待毫秒数
         */
        jumpPage: function(url, time) {
            var fn = function() {
                window.location.href = url;
            };
            if (!time) {
                time = 0;
            }
            setTimeout(fn, time);
        }
    };
    module.exports = Location;
});

/**
 * location  相关操作
 * @param key
 */
define("js/cmd/cicada/web/cicada_page", [], function(require, exports, module) {
    var Page = {
        /** 获得当前屏幕宽高 **/
        getOffset: function() {
            return {
                width: document.body.offsetWidth,
                height: document.body.offsetHeight
            };
        },
        getBF: function() {
            var ua = navigator.userAgent.toLowerCase();
            var scene = ua.indexOf("micromessenger") > -1 ? "weixin" : /qq\/([\d\.]+)*/.test(ua) ? "qq" : "web";
            return scene;
        },
        /**
         * 返回上一页
         */
        back: function() {
            window.history.go(-1);
        },
        /**
         * 分解DOM名称，已spe分割
         * @param doms  分解dom集合
         * @param spe   分隔符
         * @returns {string}
         */
        sliceName: function(doms, spe) {
            var array = new Array();
            for (var i = 0; i < doms.length; i++) {
                var $obj = $(doms[i]);
                var name = $obj.attr("name");
                array.push(name);
            }
            if (JString.isEmpty(spe)) spe = ",";
            return array.join(spe);
        }
    };
    module.exports = Page;
});
