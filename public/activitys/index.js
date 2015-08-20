var goPage = function(type, viewName) {
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
}

var  checkMobile = function() {
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

var getParamByName = function (url,paras) {
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

var mb = checkMobile();

//环境
var server = {
    url :{
        credit : "http://imzhiliao.com/credit"
    }
}
var token = getParamByName(window.location.href,"token");

console.log(token);

if(!token){
    alert("用户标识为空");
}


function goCicadaStore (){
    window.location.href = server.url.credit+"/jf/index.html?token="+token+"&clientType=iOS";
}

