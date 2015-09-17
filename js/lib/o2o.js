/**
 * Created by hulgy on 15/4/14.
 */

AJAX = {
    pictureUrl: "http://115.28.243.129/PlatformWebApiService/",   //上传图片显示地址

    url: "http://115.28.243.129/PlatformWebApiService/",

    fileUploadUrl: "http://115.28.243.129/PlatformWebApiService/",

    //picShowUrl:"http://www.ImageWeb.com",


    ajax:function(opt){
        var url = this.url + opt.src,
            data = opt.data || {},
            type = opt.type,
            success = opt.callback;

        if(type == "post"){
            data = JSON.stringify(data);
        }

        //$.loadShow();
        $.ajax({
            type:type,
            cache: false,
            crossDomain: true,
            url:url,
            data:data,
            contentType:"application/json",
            dataType:"json",
            timeout:60000,
            success:function(rs){
                //$.loadHide();
                var state = rs.ResultType;
                if(state) {
                    //成功
                    var result = rs.Body || [];
                    success(result);
                }else{
                    //失败
                    var code=state.ClientErrorCode,
                        msg = state.Msg,
                        str="";
                    str="错误代码："+code+"错误信息："+msg;
                    alert(str);
                }
            },
            error:function(e){
                //$.loadHide();
                var state = e.status,
                    msg = "";

                if(state == "404" || state == "500"){
                    msg = "服务器繁忙,请稍后在试!";
                }else{
                    msg = "无法连接服务器";
                }

                alert(msg);
            }
        });
    },

    //<!--投票部分开始-->
    //获取所有投票问题
    getAllVotes:function(data){
        var url = "api/Vote/GetVoteQuestionList",
            success = $.getFunction(data.callback);

        this.ajax({
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //根据id获取投票的所有数据
    getVoteDetailsByID:function(data){
        var url = "api/Vote/GetVoteDetailsByID",
            success = $.getFunction(data.callback);

        this.ajax({
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //执行投票动作
    voteSure:function(data){
        var url = "api/Vote/GetExecuteVote",
            success = $.getFunction(data.callback);

        this.ajax({
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //判断用户是否参加过某个问题
    judgeQuestion:function(data){
        var url = "api/Vote/GetCheckUserCanVote",
            success = $.getFunction(data.callback);

        this.ajax({
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },

    //<!--投票部分结束-->
};
