


define(function(require,exports,module){


    var Util = require("cicada");
    var template = require("artTemplate");


    var Ajax = {
        getShareData : function(){
            var result  ="";
            $.ajax({
                type: "get",
                url: "/cmw/task/json/share.json",
                async : false,
                success : function(res){
                    result  = res;
                }
            });
            return result;
        },
        getTaskList: function (token, queryTime, callback) {
            $.ajax({
                type: "post",
                url: CONSTANT_ENV.credit + '/task/getTaskList',
                dataType: 'json',
                data: {
                    "token": token,
                    "queryTime": queryTime
                },
                crossDomain: true,
                success: callback
            });
        }
    };


    var UI;

    var  h5_share =  CONSTANT_RES.invite +"?targetUserType=0";

    //处理button
    window.goPage = function(url){
        console.log(url);
        switch (url){
            case CONSTANT_TASK.cicada_url.inverte_publish  :
                Util.other.goPage(window.clientType,"publish");
                break;
            case CONSTANT_TASK.cicada_url.inverte_teacher  :
                Util.other.sharePgaeByUserId(window.clientType,h5_share,window.shareJson);

                break;
            case CONSTANT_TASK.cicada_url.inverte_parent  :
                Util.other.sharePgaeByUserId(window.clientType,h5_share,window.shareJson);
                break;
        }
    };
    window.goBack =function(){
        Util.other.back(window.clientType);
    };



    $(function () {

        UI = {
            content: $("#content")
        };


        //获得share
        window.shareJson = Ajax.getShareData();
        //解析地址
        var params= Util.web.getParams();
        var token = params['token'];

        //window.clientType  = params['clientType'];
        window.clientType  = Util.os.checkMobile().type;


        if(!token){
            alert('token不能为空！');
            return;
        }
        var queryTime = 0;

        //获取任务列表
        Ajax.getTaskList(token, queryTime, function (res) {
            if (res.rtnCode == '0000000') {
                var html = template('task-tem', res);
                UI.content.html(html);
            } else {
                alert(res.msg);
            }
        });

    });



});



