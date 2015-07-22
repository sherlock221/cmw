define(function (require, exports, module) {

    //uc需要token
    var token =  "4e10b388-d2a0-4e59-baf0-3b503425e032";

    //模板引擎
    var template  = require("artTemplate");
    var  cicada  = require("cicada");


    //获得分类
    var cateLog = cicada.web.getParamByName("cateLog");


    var UI = {
        BasicListTmp : $("#BasicListTmp"),
        BasicList : $("#BasicList")
    }

    var loadListByCateLog = function(){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfoByCatalog",{
            "style": "",
            "data": {
                "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
                "cateLogType" : cateLog,
                "clientType" : window.isIOS
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){
                var data = template('BasicListTmp', {list: res.bizData});
                UI.BasicList.html(data);
            }
            else{
                alert(res.msg);
            }
        });

    }

    var Event = {

        init : function(){

            //首次加载
            loadListByCateLog();

        }
    }


    Event.init();



});






