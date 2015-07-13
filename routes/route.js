/**
 * 路由配置列表
 * sherlock221b
 * @type {*|exports}
 */

//邀请分享
var  routes =
    {
        "/share/invite": require("./share/invite.ctrl"),
        "/task" : require("./task/task.ctrl"),
        "/help" : require("./help/help.ctrl")
    }

var init  = function(app){
    console.log("初始化路由!");
    for(var r  in routes){
        app.use(r,routes[r]);
    }
}

exports.init = init;

