

var search = function(){
    $.postJSON(SERVER.url+"/uc/helpDoc/getHelpDocInfo",{
        "style": "",
        "data": {
            "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
            "clientType":'0',
            "version":'',
            "catalogType":'1',
            "searchTitle":'',
            "limitCount":'7'
        },
        "clientInfo": {}
    },function (res) {
        var html = template('test', {list: res.bizData});
        document.getElementById('content').innerHTML = html;
        console.log("data");
    });
}

var compareResult = function(){

}