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
    //获取最新的投票结果
    getNewVotes:function(data){
        var url = "api/Vote/GetNewestResult",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //获取火热进行中的投票
    getHotVotes:function(data){
        var url = "api/Vote/GetHotVoting",
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

    //<!--政务申请部分开始-->
    //便民服务申请发起
    getConvenientApply:function(data){
        var url = "api/Convenient/GetConvenientApply",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //便民服务申请回执
    getRecipit:function(data){
        var url = "api/Convenient/GetRecipit",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //条件获取所有的申请数据
    getConvelListByCon:function(data){
        var url = "api/Convenient/GetConvelListByCon",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //通过申请单号获取回执单数据
    getReceiptByConid:function(data){
        var url = "api/Convenient/GetReceiptByConId",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //通过申请单号获取申请单数据
    getConveByConid:function(data){
        var url = "api/Convenient/GetConveByConId",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //<!--政务申请部分结束-->

    //<!--学校缴费部分开始-->
    //学生的缴费信息
    getTuitionInfo:function(data){
        var url = "api/Payment/GetTuitionInfo",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //获取缴费记录
    getParentsPayRecords:function(data){
        var url = "api/Payment/GetParentsPayRecordsBy",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //获取电子凭证
    getElectronicVoucherByID:function(data){
        var url = "api/Payment/GetElectronicVoucherByID",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //更新订单状态
    //支付状态查询
    //根据地区查询学校集合
    //根据地区并根据学校名称模糊查询学校
    //<!--学校缴费部分结束-->

    //<!--意见交流、专家问诊部分开始-->
    //通过用户名id获取用户的问题列表
    getUserQuestionlistByUserID:function(data){
        var url = "api/BBS/GetUserQuestionsListByUserid",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊我提问的所有问题
    getMyeExpertQue:function(data){
        var url = "api/BBS/GetMyExpertQue",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流我提问的所有问题
    getMyExchangeQue:function(data){
        var url = "api/BBS/GetMyExchangeQue",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //获取所有问题
    getAllQuestion:function(data){
        var url = "api/BBS/getAllQuestions",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊所有问题
    getAllExpertQuestions:function(data){
        var url = "api/BBS/getAllExpertQue",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流所有问题
    getAllExchangeQuestions:function(data){
        var url = "api/BBS/getAllExchangeQue",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊提交我的提问
    getSubmitExpertQues:function(data){
        var url = "api/BBS/GetSubmitExpertQues",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流提交我的提问
    getSubmitExchangeQues:function(data){
        var url = "api/BBS/GetSubmitExchangeQues",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊/意见交流：获取详情
    getUserQuestionsDetailByUserID:function(data){
        var url = "api/BBS/GetUserQuestionsDetailByUserid",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊  问题点赞
    getSubPraiseExpert:function(data){
        var url = "api/BBS/GetSubPraiseExpert",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流  问题点赞
    getSubPraiseExchange:function(data){
        var url = "api/BBS/GetSubPraiseExchange",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊/意见交流：获取问题回复列表
    getReplyListByQuesID:function(data){
        var url = "api/BBS/GetReplyListByQuesID",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊：提交回复
    getSubExpertReply:function(data){
        var url = "api/BBS/GetSubExpertReply",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流：提交回复
    getSubExchangeReply:function(data){
        var url = "GET api/BBS/GetSubExchangeReply",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊/意见交流：我的回复的问题列表
    getUserReplyListByUserID:function(data){
        var url = "api/BBS/GetUserReplyListByUserid",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //专家问诊-我的回复的问题列表
    getUserReplyExpert:function(data){
        var url = "api/BBS/GetUserReplyExpert",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //意见交流-我的回复的问题列表
    getUserReplyExchange:function(data){
        var url = "api/BBS/GetUserReplyExchange",
            success = $.getFunction(data.callback);

        this.ajax({
            line:0,
            src:url,
            callback:success,
            type:"get",
            data:data.data
        });
    },
    //<!--意见交流、专家问诊部分结束-->
};





















