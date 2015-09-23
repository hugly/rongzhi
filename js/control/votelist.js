/**
 * Created by hulgy on 15/9/22.
 */
(function($){

    var vote={
        state: $.getUrlParam("state"),
        body:$("#voteall"),
        oTem:$("#showtemp"),
        //初始化
        init:function(){
            this.getAllVote();
            if(this.state == 1){
                this.getTheNewest();
            }else{
                this.getTheHotest();
            }
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
                    var oBox=_this.body.find(".box");
                    _this.fillVoteData(oBox,_this.state,data);
                }
            });
        },
        //获取最热投票
        getTheHotest:function(){
            var _this=this;
            AJAX.getHotVotes({
                callback:function(data){
                    var oBox=_this.body.find(".box");
                    _this.fillVoteData(oBox,_this.state,data);
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
                    status:_this.state,
                    pageindex:0,
                    pagesize:10
                },
                callback:function(data){
                    for(var i= 0,j=data.length;i<j;i++){
                        _this.body.find(".listbox").append($('<div class="com" dataid="'+data[i].votequestionid+'"><p><a target="_blank" href="cw_vote_three.html?id='+data[i].votequestionid+'&state='+data[i].status+'">'+data[i].title+'</a></P><p class="time">'+data[i].endtime+'<i>'+data[i].number+'</i><b>人参与</b></p></div>'));
                    }
                }
            });
        },
        //填充投票数据
        fillVoteData:function(obj,state,data){
            var status= 0,
                colorArr=[["",""],["div1_red","div2_red"],["div1_blue","div2_blue"],["div1_yellow","div2_yellow"],["div1_green","div2_green"],];
            obj.find(".tatle a").attr({
                "href":"cw_vote_two.html?state="+status
            });
            obj.attr({
                "dataid":data.votequestionid
            });
            obj.find(".name a").attr({
                "href":"cw_vote_three.html?id="+data.votequestionid+"&state="+status
            });

            if(state == 1){
                obj.find(".number").html(data.number+"<i>人参与</i>");
            }else{
                obj.find(".tatle h3").html('大家来投票<i>（进行中）</i>');
            }
            obj.find(".name a").text(data.title);
            for(var i= 0,j=data.options.length;i<j;i++){
                var id="h"+i;
                if(state == 1){
                    obj.find(".chek").append($('<div><input type="radio" disabled=""><label>'+data.options[i].title+'</label></div>'));
                    obj.find(".sub").css({
                        "display":"none"
                    });
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