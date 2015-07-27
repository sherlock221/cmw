define(function (require, exports, module) {

    //uc需要token
    var token =  "4e10b388-d2a0-4e59-baf0-3b503425e032";
    var  cicada  = require("cicada");

    //模板引擎
    var template  = require("artTemplate");

    //获得分类
    var id = cicada.web.getParamByName("id");
    var cateLogId = cicada.web.getParamByName("cateLogId");




    var UI = {
        DetailContent : $("#detail-content"),
        DetailTitle : $("#detail-title"),
        TitleName : $("#titleName"),
        Title:$("#title")
    }
    var loadDetail = function(id){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfoDetail",{
            "style": "",
            "data": {
                "token": token,
                "id" : id
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){
                UI.DetailContent.html(res.bizData.content);
                UI.DetailTitle.html(res.bizData.title);
                //UI.Title.css("background-color","#557bc4");

            }
            else{
                alert(res.msg);
            }
        });

    };


    var loadCateLogList = function(){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfoByCatalog",{
            "style": "",
            "data": {
                "token": token,
                "catalogType" : cateLogId,
                "clientType" : window.isIOS,
                "pageIndex" : 1,
                "pageSize" : 3
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){
                var html = template('relateListTmp', {list: res.bizData.helpDocList});
                document.getElementById('relateList').innerHTML = html;
                console.log("data");
            }
            else{
                alert(res.msg);
            }
        });

    }


    loadDetail(id);

    if(cateLogId){
        loadCateLogList();
    }

});





