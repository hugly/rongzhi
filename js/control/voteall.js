/**
 * Created by hulgy on 15/9/22.
 */
(function($){

    var vote={
        body:$("#voteall"),
        //初始化
        init:function(){
            this.getAllVote();
            this.getTheNewest();
            this.getTheHotest();
        },
        //获取最新投票结果
        getTheNewest:function(){
            var _this=this;
            AJAX.getNewVotes({
                callback:function(data){
                    var oBox=_this.body.find(".box").eq(0);

                    oBox.attr({
                        "dataid":data.votequestionid
                    });
                    oBox.find(".name a").text(data.title);
                    for(var i= 0,j=data.options.length;i<j;i++){
                        oBox.find(".chek").append($('<div><input type="radio" disabled=""><label>'+data.options[i].title+'</label></div>'));
                    }
                }
            });
        },
        //获取最热投票
        getTheHotest:function(){
            AJAX.getHotVotes({
                callback:function(data){
                    console.log(data);
                }
            });
        },
        //获取所有的投票问题
        getAllVote:function(){
            AJAX.getAllVotes({
                data:{
                    searchtxt:"",
                    type:"vote",
                    status:"0",
                    pageindex:0,
                    pagesize:10
                },
                callback:function(data){
                    console.log(data);
                }
            });

        }
    };
    vote.init();

})(jQuery);