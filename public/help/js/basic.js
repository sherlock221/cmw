var account = function(){
    $.postJSON(SERVER.url+"/uc/helpDoc/getHelpDocInfoByCatalog",{
        "style": "",
        "data": {
            "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
            "clientType":'0',
            "version":'',
            "catalogType":'1',
            "limitCount":'7'
        },
        "clientInfo": {}
    },function (res) {
        var html = template('test', {list: res.bizData});
        document.getElementById('content').innerHTML = html;
        console.log("data");
    });
};
var setting = function(){
    $.postJSON(SERVER.url+"/uc/helpDoc/getHelpDocInfoByCatalog",{
        "style": "",
        "data": {
            "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
            "clientType":'0',
            "version":'',
            "catalogType":'2',
            "limitCount":'7'
        },
        "clientInfo": {}
    },function (res) {
        var html = template('test', {list: res.bizData});
        document.getElementById('content').innerHTML = html;
        console.log("data");
    });
};

var store = function(){
    $.postJSON(SERVER.url+"/uc/helpDoc/getHelpDocInfoByCatalog",{
        "style": "",
        "data": {
            "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
            "clientType":'0',
            "version":'',
            "catalogType":'3',
            "limitCount":'7'
        },
        "clientInfo": {}
    },function (res) {
        var html = template('test', {list: res.bizData});
        document.getElementById('content').innerHTML = html;
        console.log("data");
    });
};
var card = function(){
    $.postJSON(SERVER.url+"/uc/helpDoc/getHelpDocInfoByCatalog",{
        "style": "",
        "data": {
            "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
            "clientType":'0',
            "version":'',
            "catalogType":'4',
            "limitCount":'7'
        },
        "clientInfo": {}
    },function (res) {
        var html = template('test', {list: res.bizData});
        document.getElementById('content').innerHTML = html;
        console.log("data");
    });
};
