/**
 * Created by abjia on 15-6-26.
 */


//配置所有图片列表
var imgList =
    [
        "resources/bg-default.jpg",
        "resources/big-circle-01.png",
        "resources/big-circle-02.png",
        "resources/font.png",
        "resources/fruit.png",
        "resources/head.png",
        "resources/main-img.png",
        "resources/main-img-02.png",

        "resources/svg/baishi.svg",
        "resources/svg/circle-org.svg",
        "resources/svg/earth.svg",
        "resources/svg/weilai.svg",
        "resources/svg/xiangxiang.svg",

        "resources/line/L1.png",
        "resources/line/L2.png",
        "resources/line/L3.png",
        "resources/line/L4.png",
        "resources/line/L5.png",
        "resources/line/L6.png",
        "resources/line/R1.png",
        "resources/line/R3.png",
        "resources/line/R4.png",
        "resources/line/R5.png"
    ];



new loadermsk(imgList, "#0e79ef", function () {
    console.log("加载完成...");
    Event.init();

});




var  answerList  = [];
var  Indicator = 0;
var  jj = 0;
var  tb = ["A","B","C","D"];
var UI = {
    AnswerLayer : $("#answerLayer"),
    FirstLayer : $("#indexLayer"),
    SecondLayer : $("#secondLayer"),
    ThirdLayer : $("#thirdLayer"),
    FourLayer : $("#fourLayer"),
    FiveLayer : $("#fiveLayer"),
    SixLayer : $("#sixLayer"),
    SevenLayer : $("#sevenLayer"),
    SubAnswer : $("#subAnswer"),
    FruitBg  : $("#fruitBg")
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
               if(Indicator == 3){
                   UI.FruitBg.hide();
                   UI.SubAnswer.show();
               }
            },600);
        });
        //结束答题
        UI.SubAnswer.bind("click",function(){
            alert("您答对了"+jj);
        });

        //1个ui动画
        Event.firstAni();

        //2个ui动画
        Event.secondAni();

        //3个ui动画
        Event.thirdAni();

        //4个ui动画
        Event.fourAni();

        //5个ui动画
        Event.fiveAni();

        //6个ui动画
        Event.sixAni();

        //7个ui动画
        Event.sevenAni();


        UI.FirstLayer.removeClass("hide");


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
        $fingerprint.hammer().bind("tap",function(e){
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
        var $py = UI.ThirdLayer.find("#py");
        //var $puzzle = UI.ThirdLayer.find(".puzzle");
        $puzzyWrap[0].addEventListener('webkitAnimationEnd', function(t){
            if(t.animationName == "swing"){
                $pointPuzzy.removeClass("hide");
            }
        }, false);


        $py[0].addEventListener('webkitTransitionEnd', function(t){
            UI.ThirdLayer.addClass("hide");
            UI.FourLayer.removeClass("hide");
        }, false);

        var isEndDrag = false;
        interact('.draggable')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                onstart:function(){
                  console.log("start");
                    $pointPuzzy.addClass("hide");
                },
                onmove: dragMoveListener,
                onend: function (event) {
                    var target = event.target;
                    console.log(isEndDrag,target);
                    target.style.transition =   target.style.webkitTransition = "transform ease 1s";
                    target.style.transition =   target.style.webkitTransition = "-webkit-transform ease 1s";
                    target.style.webkitTransform =
                        target.style.transform =
                            'rotate(14deg) translate(-76px,193px)'

                }
            });
        //  -webkit-transform: rotate(14deg) translate(16px,42px);
        function dragMoveListener (event) {
            var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            console.log(x,y);

            if(x < -130 && y > 135){
                isEndDrag = true;
                return;
            }

            if(!isEndDrag){
                // translate the element
                target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';
                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }




        }

    },
    fourAni : function(){
        var $point = UI.FourLayer.find(".point-01");
        //ios显示svg
        //if(isIOS){
                //线条
                new Vivus('third-earth-svg', {type: 'oneByOne', duration: 100, file: 'resources/svg/earth.svg'}, function(res){
                    //人物
                    new Vivus('third-main-svg', {type: 'delayed', duration: 100, file: 'resources/svg/baishi.svg'}, function(res){
                            end();
                    });
                });
        //}

        var end = function(){
            $point.removeClass("hide");
        }

        $point.hammer().bind("tap",function(){
            console.log("tao..");
            UI.FourLayer.addClass("hide");
            UI.SixLayer.removeClass("hide");
        });



    },
    fiveAni : function(){

        var $point = UI.FiveLayer.find(".point-01");
        var $puzzyWrap = UI.FiveLayer.find(".wg-cmp-img");
        $puzzyWrap[0].addEventListener('webkitAnimationEnd', function(t){
            console.log("five..");
            $point.removeClass("hide");
        }, false);

        $point.hammer().bind("tap",function(){
            UI.FiveLayer.addClass("out");
           setTimeout(function(){
               UI.SixLayer.removeClass("hide");
               UI.FiveLayer.addClass("hide");
           },500);
        });

    },
    sixAni : function(){
        var sixNext = UI.SixLayer.find("#sixNext");
        sixNext.hammer().bind("tap",function(){
            UI.SixLayer.addClass("out");
            setTimeout(function(){
                UI.SixLayer.addClass("hide");
                UI.SevenLayer.removeClass("hide");
            },500);
        });

    },
    sevenAni : function(){
        var lightBtn = UI.SevenLayer.find("#light-button");
        lightBtn.hammer().bind("tap",function(){
                UI.AnswerLayer.removeClass("hide");
                UI.SevenLayer.addClass("hide");
        });
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
        console.log(jj);
        return;
    }

    refreshAnswer(answerList[Indicator]);
}


