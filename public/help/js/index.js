

$.postJSON(SERVER.url+"/uc/helpDoc/getDefaultHelpDocInfo",{
    "style": "",
    "data": {
        "token": "4e10b388-d2a0-4e59-baf0-3b503425e032"
    },
    "clientInfo": {}
},function (res) {
    var html = template('test', {list: res.bizData});
    document.getElementById('content').innerHTML = html;
    console.log("data");
});

console.log("help");
    var state = true;
    var change = function(){
        if(state == true){
            $("#flex").show();
            $("#bottom-bar").hide();
            $("#list-name:nth-child(n)").hide();
          state = false;
        }
        else{
            $("#flex").hide();
            $("#bottom-bar").show();
            $("#list-name:nth-child(n)").show();
            state = true;
        }
    };

    $("#searchInit").toggle(function(){
        window.location.href="/cmw/views/help/search";
    });







