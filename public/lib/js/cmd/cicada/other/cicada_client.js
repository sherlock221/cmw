/**
 * cicada client
 * @param key
 */
define(function(require,exports,module){

    var  Client = {
        openCiacada : function(){
//            var isrefresh =  Util.location.getParams().refresh;
//            if(isrefresh == 1) {
//                return
//            }
            window.location.href = 'http://cicada://public/page/index';
//            window.setTimeout(function () {
//                // 附加一个特殊参数，用来标识这次刷新不要再调用cicada://
//           //     window.location.href += '?refresh=1'
//                //alert("超时");
//            }, 500);
        },
        sharePgaeByUserId: function (type, url, sjson) {

            if (type == "iOS") {

                sjson.url = url;
                var temp = JSON.stringify(sjson);
                var  encodeJson = encodeURI(temp);
                console.log("ios", CONSTANT_TASK.cicada_share_url.ios_share_url +"?json="+encodeJson);
                window.location.href = CONSTANT_TASK.cicada_share_url.ios_share_url +"?json="+encodeJson;
            }
            //android
            else {
                var temp = JSON.stringify(sjson);
                console.log("android", temp);
                window.cicada.sharePageByUserId(url, temp);
            }
        },

        goPage : function(type,viewName){
            var params = [
                {
                    key: "viewName",
                    value: viewName
                }
            ];
            if (type == "iOS") {
                var params = Util.location.encodeParam(params);
                console.log("ios", "cicada://cicada/page/goPage" + params);
                window.location.href = "cicada://cicada/page/goPage" + params;
            }
            //android
            else {
                window.cicada.goPage(viewName);
            }

        },
        back : function(type){
            if(type == "iOS"){
                console.log("ios", "cicada://cicadaStore/back");
                window.location.href="cicada://cicadaStore/back";
            }
            else{
                window.cicadaStore.back();
            }
        }
    }

    module.exports  = Client;
});