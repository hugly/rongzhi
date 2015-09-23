/**
 * Created by hulgy on 15/9/23.
 */
(function(){
    var voteDetail={
        body:$("#voteall"),
        id: $.getUrlParam("id"),
        oTem:$("#showtemp"),
        //初始化
        init:function(){
            this.getDataByID();
            this.getAllVote();
            this.bindEvent();
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
                        _this.body.find(".Vote_t").append($('<div class="vote-list"><div class="name"><a href="cw_vote_three.html?state=1&id='+data[i].votequestionid+'">'+data[i].title+'</a></div><div class="sum"><i>'+data[i].number+'</i>人参与</div></div>'));
                    }
                }
            });
        },
        //绑定事件
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
        //根据id获取值
        getDataByID:function(){
            var _this=this;
            AJAX.getVoteDetailsByID({
                data:{
                    votequestionid:_this.id
                },
                callback:function(data){
                    var oDate=new Date(),
                        oDate1=new Date(data.starttime),
                        oDate2=new Date(data.endtime),
                        stime=oDate1.getTime(),
                        etime=oDate2.getTime(),
                        ntime=oDate.getTime(),
                        state=0;

                    if(etime<ntime){
                        state=1;
                    }
                    console.log(data);
                    _this.fillVoteData($(".box"),state,data)
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
            obj.find(".name i").text(data.starttime);

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
                obj.find(".view").append(oTar);
            }

        }

    };
    voteDetail.init();
})(jQuery);