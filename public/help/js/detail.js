$.postJSON(SERVER.url+"/uc/helpDoc/getDefaultHelpDocInfo",{
    "style": "",
    "data": {
        "token": "4e10b388-d2a0-4e59-baf0-3b503425e032",
        "id":'id'
    },
    "clientInfo": {}
},function (res) {
    var html = template('test', {list: res});
    document.getElementById('content').innerHTML = html;
    console.log("data");
});