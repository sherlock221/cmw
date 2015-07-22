
define(function (require, exports, module) {
    //uc需要token
    var token =  "4e10b388-d2a0-4e59-baf0-3b503425e032";

    //模板引擎
    var template  = require("artTemplate");
    var  cicada  = require("cicada");



    var limitCount = 7;

    var UI = {
        searchListTmp : $("#searchListTmp"),
        searchList : $("#searchList"),
        search : $("#search"),
        searchBar : $("#searchBar")
    }

    var loadListByLike = function(searchTitle){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfo",{
            "style": "",
            "data": {
                "token": token,
                 "searchTitle":searchTitle || "",
                "limitCount":limitCount,
                "clientType" : window.isIOS
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){
                var data = template('searchListTmp', {list: res.bizData});
                UI.searchList.html(data);
            }
            else{
                alert(res.msg);
            }
        });
    }

    var Event = {

        init : function(){

            //按钮查询
            UI.search.on("input",function(){
                var val  = UI.search.val().trim();
                console.log("模糊",val);
                loadListByLike(val);
            });

            //深度查询
            UI.searchBar.hammer().bind("tap",function(){
                var val  = UI.search.val().trim();
                console.log("深度",val);
                loadListByLike(val);
            });

        }
    }


    Event.init();



});















