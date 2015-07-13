/**
 * Created by abjia on 15-6-26.
 */


var  answerList  = [];
var  Indicator = 0;
var  jj = 0;
var  tb = ["A","B","C","D"];


var UI = {
    AnswerLayer : $("#answerLayer"),
    FirstLayer : $("#indexLayer"),
    SecondLayer : $("#secondLayer"),
    ThirdLayer : $("#thirdLayer")
}
//检测当前浏览器
var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var isIOS = false;


var  Event = {

    init : function(){

        isIOS = browser.versions.ios;

        //加载数据
        this.data();

        //视差滚动
        var scene = document.getElementById('arrow-list');
        var parallax = new Parallax(scene);


        //绑定答题选择
        UI.AnswerLayer.on("click",".answer-select li",function(){
            var $this = $(this);
            var answer  = $this.attr("data-option");
            $this.addClass("active").siblings().removeClass("active");

            if(answer == tb[Indicator]){
                jj++;
            }
            setTimeout(function(){
                nextAnswer();
            },600);
        });

        //1个ui动画
        Event.firstAni();

        //2个ui动画
        Event.secondAni();

        //3个ui动画
        Event.thirdAni();

        //4个ui动画
        Event.fourAni();



    },
    data : function(){
        loadAnswerList();
    },


    firstAni : function(){


        if(isIOS){
            //主页svg 动画
            new Vivus('index-xx-svg', {type: 'oneByOne', duration: 100, file: 'resources/svg/xiangxiang.svg'}, function(res){
                console.log(res);
            });
        }


        var $fontEdu = $("#font-education");
        var $fingerprint = $("#fingerprint");
        $fontEdu[0].addEventListener('webkitAnimationEnd', function(t){
            $fingerprint.removeClass("hide")
        }, false);

        //全部消失
        $fingerprint.bind("click",function(e){
            UI.FirstLayer.removeClass("out").addClass("out");
            //hide
            setTimeout(function(){
                UI.FirstLayer.addClass("hide");
                UI.SecondLayer.removeClass("hide");
            },500);
        });
    },

    secondAni : function(){

        var $bigringOut =  UI.SecondLayer.find(".big-ring-out");
        $bigringOut[0].addEventListener('webkitAnimationEnd', function(t){
                console.log("end...");
            if(t.animationName == "zoomOut"){
                UI.ThirdLayer.removeClass("hide");
                UI.SecondLayer.addClass("hide");
            }

        }, false);

    },
    thirdAni : function(){
        var $pointPuzzy = UI.ThirdLayer.find(".point-01");
        var $puzzyWrap = UI.ThirdLayer.find(".puzzle-wrap");
        $puzzyWrap[0].addEventListener('webkitAnimationEnd', function(t){
            if(t.animationName == "swing"){
                $pointPuzzy.removeClass("hide");
            }
        }, false);

    },

    fourAni : function(){
        var $pointPuzzy = UI.ThirdLayer.find(".point-01");
        var $puzzyWrap = UI.ThirdLayer.find(".puzzle-wrap");
        $puzzyWrap[0].addEventListener('webkitAnimationEnd', function(t){
            if(t.animationName == "swing"){
                $pointPuzzy.removeClass("hide");
            }
        }, false);


        if(isIOS){
            //主页svg 动画
            new Vivus('third-main-svg', {type: 'oneByOne', duration: 100, file: 'resources/svg/baishi.svg'}, function(res){
                console.log(res);
            });
        }



    }
}



//渲染答题
var refreshAnswer = function(obj){

    //编号
    UI.AnswerLayer.find(".answer-num").html(obj.questionTitle);

    //内容
    UI.AnswerLayer.find(".answer-title").html(obj.questionDesc);


    //内容
    var $select = UI.AnswerLayer.find(".answer-select");


    //渲染选项
    var temp = "";
    for(var i =0 ; i<obj.questionOptions.length;i++){
        var s  = obj.questionOptions[i];
        var li = '<li class="" data-option="'+s.optionName+'">  <i class="ib select-active main-img"></i>';

        li += '<a href="javascript:void(0)">';
        li += '<span>'+ s.optionName+'</span>';
        li += s.optionValue;
        li += '</a></li>';

        temp += li;
    }

    $select.html(temp);
}

//加载问题
var loadAnswerList = function(){
    $.getJSON("./data/question.json",function(json){
        console.log("加载完问题列表...");
        answerList = json;
        refreshAnswer(answerList[Indicator]);
    })
}

//下个问题
var nextAnswer = function(){
    if( Indicator++ > 2){
        console.log("您答对了",jj);
        return;
    }
    refreshAnswer(answerList[Indicator]);
}





Event.init();