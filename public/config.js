/**
 * Created by pdeng on 2015/3/20.
 */

var CONSTANT_TASK = {
    cicada_url: {
        inverte_teacher: 'cicada://inverte/teacher',
        inverte_parent: 'cicada://inverte/parent',
        inverte_publish: 'cicada://page/publish'
    },
    cicada_share_url:{
        ios_share_url:'cicada://cicada/sharePageByUserId'
    }
};

////正式
//var CONSTANT_ENV ={
//    RES : "http://imzhiliao.com:3000/cmw",
//    credit : "http://imzhiliao.com:9000/credit",
//    local:  "http://imzhiliao.com:9000/uc"
//};


//测试
var CONSTANT_ENV ={
        //node服务
        RES : "http://10.10.68.11:3000/cmw",
        credit : "http://10.10.68.11:10000/credit",
        local:  "http://10.10.68.11:10000/uc"
        //local:  "http://172.16.130.90:8083/uc"
};

//资源地址
var CONSTANT_RES = {
    //邀请页面
    invite : CONSTANT_ENV.RES+"/share/invite/product"
}