

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

             var url = CONSTANT_ENV.op+"/message/findMessageByMId";
             console.log(url);
             var data = {
                 "style": "",
                 "data": {
                     "messageId": messageId
                 },
                 "clientInfo": {}
             };

             cicada.ax.postJSON(url,{
                 "style": "",
                 "data": {
                     "messageId": messageId
                 },
                 "clientInfo": {}
             },function (res) {
                 if(res.rtnCode == "0000000"){

                     var messageInfo  = res.bizData.messageInfo;
                     var senderInfo = res.bizData.senderInfo;
                     console.log(messageInfo.sendTime);
                     var sendTime = new Date(messageInfo.sendTime).Format("yyyy-MM-dd hh:mm:ss");

                     UI.detailTitle.html(messageInfo.title);
                     UI.detailHeader.find(".timer").html(sendTime);
                     UI.detailHeader.find("a").html(senderInfo.userName);
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



