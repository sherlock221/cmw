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
