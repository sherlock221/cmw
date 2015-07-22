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
        BasicList : $("#BasicList"),
        moreQues : $("#moreQues")
    }

    var pageSize = 9;
    var pageIndex = 1;
    var pageTotal = 0;

    var isFirst = true;

    var loadListByCateLog = function(){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfoByCatalog",{
            "style": "",
            "data": {
                "token": token,
                "cateLogType" : cateLog,
                "clientType" : window.isIOS,
                "pageIndex" : pageIndex,
                "pageSize" : pageSize
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){

                if(isFirst){
                    if(res.bizData.total % pageSize == 0)
                        pageTotal = res.bizData.total / pageSize
                    else
                        pageTotal = parseInt(res.bizData.total / pageSize) +1;

                    isFirst = false;
                }

                pageTotal = res.bizData.total;
                var data = template('BasicListTmp', {list: res.bizData.helpDocList});
                UI.BasicList.append(data);

                if(pageIndex+1 > pageTotal){
                    //超过分页
                    UI.moreQues.hide();
                    return;
                }
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

    //加载更多
    UI.moreQues.hammer().bind("tap",function(){

        pageIndex++;
        loadListByCateLog();
    });



    Event.init();

});






