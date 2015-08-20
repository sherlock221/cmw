goPage = function(type, viewName) {
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

checkMobile = function() {
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
}
