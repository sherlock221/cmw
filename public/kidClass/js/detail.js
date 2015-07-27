

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

                     UI.detailTitle.html(res.bizData.title);
                     UI.detailHeader.find(".timer").html(res.bizData.sendTime);
                     UI.detailHeader.find("a").html(res.bizData.senderInfo.senderName);
                     UI.detailContent.html(res.bizData.content);

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



