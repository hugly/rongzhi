/**
 * Created by hulgy on 15/9/22.
 */
(function($){

    var vote={
        body:$("#voteall"),
        oTem:$("#showtemp"),
        //初始化
        init:function(){
            this.getAllVote();
            this.getTheNewest();
            this.getTheHotest();
            this.bindEvent();
        },
        //事件绑定
        bindEvent:function(){
            var _this=this;
            //input.label点击事件
            this.body.on("click",".chek input,.chek label",function(){
                $(this).closest(".box").attr({
                    "optionid":$(this).parent().attr("dataid")
                });
            });
            //投票事件
            this.body.on("click",".sub",function(){
                var obj=$(this).closest(".box");

                AJAX.voteSure({
                    data:{
                        questionid:obj.attr("dataid"),
                        optionid:obj.attr("optionid")
                    },
                    callback:function(data){
                        console.log(data);
                    }
                });
            });
        },
        //获取最新投票结果
        getTheNewest:function(){
            var _this=this;
            AJAX.getNewVotes({
                callback:function(data){
                    var oBox=_this.body.find(".box").eq(0);
                    _this.fillVoteData(oBox,true,data);
                }
            });
        },
        //获取最热投票
        getTheHotest:function(){
            var _this=this;
            AJAX.getHotVotes({
                callback:function(data){
                    var oBox=_this.body.find(".box").eq(1);
                    _this.fillVoteData(oBox,false,data);
                }
            });
        },
        //获取所有的投票问题
        getAllVote:function(){
            var _this=this;
            AJAX.getAllVotes({
                data:{
                    searchtxt:"",
                    type:"vote",
                    status:"0",
                    pageindex:0,
                    pagesize:10
                },
                callback:function(data){
                    for(var i= 0,j=data.length;i<j;i++){
                        _this.body.find(".Vote_t").append($('<div class="vote-list"><div class="name"><a href="javascript:;">'+data[i].title+'</a></div><div class="sum"><i>'+data[i].number+'</i>人参与</div></div>'));
                    }
                    _this.body.find(".more a").attr({
                        "href":"cw_vote_two.html?state=1"
                    });
                }
            });

            AJAX.getAllVotes({
                data:{
                    searchtxt:"",
                    type:"vote",
                    status:"1",
                    pageindex:0,
                    pagesize:10
                },
                callback:function(data){
                    for(var i= 0,j=data.length;i<j;i++){
                        _this.body.find(".Vote_t").append($('<div class="vote-list"><div class="name"><a href="javascript:;">'+data[i].title+'</a></div><div class="sum"><i>'+data[i].number+'</i>人参与</div></div>'));
                    }
                }
            });

        },
        //填充投票数据
        fillVoteData:function(obj,state,data){
            var status= 0,
                colorArr=[["",""],["div1_red","div2_red"],["div1_blue","div2_blue"],["div1_yellow","div2_yellow"],["div1_green","div2_green"],];

            state?status=1:status=0;

            obj.find(".name a").attr({
                "href":"cw_vote_three.html?id="+data.votequestionid+"&state="+status
            });

            obj.find(".tatle a").attr({
                "href":"cw_vote_two.html?state="+status
            });
            obj.attr({
                "dataid":data.votequestionid
            });
            if(state){
                obj.find(".number").html(data.number+"<i>人参与</i>");
            }
            obj.find(".name a").text(data.title);
            for(var i= 0,j=data.options.length;i<j;i++){
                var id="h"+i;
                if(state){
                    obj.find(".chek").append($('<div><input type="radio" disabled=""><label>'+data.options[i].title+'</label></div>'));
                }else{
                    var tem=$('<div dataid="'+data.options[i].voteoptionid+'"><input type="radio" name="check"><label>'+data.options[i].title+'</label></div>');
                    tem.find("input").attr({
                        "id":id
                    });
                    tem.find("label").attr({
                        "for":id
                    });
                    obj.find(".chek").append(tem);
                }
                var oTar=this.oTem.clone().removeAttr("id").removeAttr("style"),
                    num=parseFloat(data.options[i].percent)*100;
                oTar.find(".div2").css({
                    width:num+"%"
                });
                oTar.find(".div1").addClass(colorArr[i][0]);
                oTar.find(".div2").addClass(colorArr[i][1]);
                oTar.find("i").text(data.options[i].number);
                oTar.find("b").text("("+num+"% )");
                obj.find(".vote").append(oTar);
            }

        }
    };
    vote.init();

})(jQuery);