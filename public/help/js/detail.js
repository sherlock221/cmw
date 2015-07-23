define(function (require, exports, module) {

    //uc需要token
    var token =  "4e10b388-d2a0-4e59-baf0-3b503425e032";
    var  cicada  = require("cicada");


    //获得分类
    var id = cicada.web.getParamByName("id");

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
                UI.TitleName.html(res.bizData.catalogType);
                UI.Title.css("background-color","#557bc4");

            }
            else{
                alert(res.msg);
            }
        });

    }

    loadDetail(id);
});





