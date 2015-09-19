/**
 * Created by hulgy on 15/4/14.
 */

AJAX = {
    pictureUrl: "http://115.28.243.129/PlatformWebApiService/",   //上传图片显示地址

    url: "http://115.28.243.129/RZWebAPIService/",
    mainurl:"http://115.28.243.129/PlatformWebApiService/",

    fileUploadUrl: "http://115.28.243.129/PlatformWebApiService/",

    //picShowUrl:"http://www.ImageWeb.com",


    ajax:function(opt){
        var line=opt.line,
            url=this.url+opt.src,
            data = opt.data || {},
            type = opt.type,
            success = opt.callback;

        if(line == 1){
            url=this.mainurl+opt.src;
        }

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

                var header=rs.header,
                    state = header.resulttype;
                if(state == '1') {
                    //成功
                    var result = rs.body || [];
                    success(result);
                }else{
                    //失败
                    var code=header.clienterrorcode,
                        msg = header.msg,
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
    //<!--地区联动   开始-->
    //获取根地区
    getRootLocation:function(data){
        var url = "api/Location/GetRootLocation",
            success = $.getFunction(data.callback);

        this.ajax({
            line:1,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //根据地区Id获取其多有的一级子地区
    getLocationByPid:function(data){
        var url = "api/Location/GetLocationByPId",
            success = $.getFunction(data.callback);

        this.ajax({
            line:1,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //根据级别获取对应的区域集合
    getLocationByLev:function(data){
        var url = "api/Location/GetLocationByLevel",
            success = $.getFunction(data.callback);

        this.ajax({
            line:1,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //根据地区id获取地区信息
    getLocationByID:function(data){
        var url = "api/Location/GetLocationById",
            success = $.getFunction(data.callback);

        this.ajax({
            line:1,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //<!--地区联动   结束-->

    //获取所有城市名称及站简码
    getAllCityAndCode:function(data){
        var url = "api/TrainTicket/GetAllCitys",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //<!--投票部分开始-->
    //获取所有投票问题
    getAllVotes:function(data){
        var url = "api/Vote/GetVoteQuestionList",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
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
            line:0,
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
            line:0,
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
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },

    //<!--投票部分结束-->


};
