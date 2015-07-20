define(function (require, exports, module) {

    //uc需要token
    var token =  "4e10b388-d2a0-4e59-baf0-3b503425e032";


    //模板引擎
    var template  = require("artTemplate");
    var  cicada  = require("cicada");


    var UI = {
        CateTypeListSpread : $("#cateTypeListSpread"),
        CateTypeListIndent : $("#cateTypeListIndent"),
        CateTypeListIndentRenGong : $("#cateTypeListIndentRenGong")
    }



    var loadList = function(){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getDefaultHelpDocInfo",{
            "style": "",
            "data": {
                "token": token
            },
            "clientInfo": {}
        },function (res) {
            if(res.rtnCode == "0000000"){
                var html = template('helpListTmp', {list: res.bizData});
                document.getElementById('helpList').innerHTML = html;
                console.log("data");
            }
            else{
                alert(res.msg);
            }
        });

    }


    //加载帮助类型
    var loadCateLogTypes = function(){
            $.getJSON("http://imzhiliao.com:3001/cmw/help/json/cateLogTypes.json"
            ,function (res) {
                    var tp = template('cateTypeListIndentTmp', {list: res});
                    var tp2 = template('cateTypeListSpreadTmp', {list: res});
                    var indent = UI.CateTypeListIndent.find("#cateTypeListIndentInner");
                    indent.html(tp).append(UI.CateTypeListIndentRenGong.html());

                    UI.CateTypeListSpread.find("#cateTypeListSpreadInner").html(tp2);
            });
    }

    var loadListByCateLog = function(){
        cicada.ax.postJSON(CONSTANT_ENV.local+"/helpDoc/getHelpDocInfoByCatalog",{
            "style": "",
            "data": {
                "token": "4e10b388-d2a0-4e59-baf0-3b503425e032"
            },
            "clientInfo": {}
        },function (res) {

            if(res.rtnCode == "0000000"){
                var html = template('helpListTmp', {list: res.bizData});
                document.getElementById('helpList').innerHTML = html;
                console.log("data");
            }
            else{
                alert(res.msg);
            }


        });

    }

    var Event = {

        init : function(){

            var state = true;

            //底部切换
            window.changeFooter = function(){
                if(state == true){
                    UI.CateTypeListIndent.show();
                    UI.CateTypeListSpread.hide();
                    state = false;
                }
                else{

                    UI.CateTypeListIndent.hide();
                    UI.CateTypeListSpread.show();
                    state = true;
                }
            };

            $("#searchInit").toggle(function(){
                window.location.href="/cmw/views/help/search";
            });


            //首次加载
            loadList();
            loadCateLogTypes();
            //loadListByCateLog();

        }
    }


    Event.init();



});













