

define(function(require,exports,module){

    var cicada = require("cicada");

    var UI = {
        "detailContent" : $("#kidMainContent"),
        "detailTitle" : $("#detailTitle"),
        "detailHeader" : $("#detailHeader")
    }

    var messageId = cicada.web.getParamByName("messageId");



    var Ajax = {

         findMessageById: function(messageId){
             cicada.ax.postJSON(CONSTANT_ENV.op+"/message/findMessageByMId",{
                 "style": "",
                 "data": {
                     "messageId": messageId
                 },
                 "clientInfo": {}
             },function (res) {
                 if(res.rtnCode == "0000000"){

                     var messageInfo  = res.bizData.messageInfo;
                     var senderInfo = res.bizData.senderInfo
                     var sendTime = new Date(messageInfo.sendTime).Format("yyyy-MM-dd HH:mm:ss");

                     UI.detailTitle.html(messageInfo.title);
                     UI.detailHeader.find(".timer").html(sendTime);
                     UI.detailHeader.find("a").html(senderInfo.senderName);
                     UI.detailContent.html(messageInfo.content);

                 }
                 else{
                     alert(res.msg);
                 }
             });

        }
    };

    $(function () {

         if(messageId){
             Ajax.findMessageById(messageId);
         }
        else{
             alert("messageId为空!");
         }

    });


});



