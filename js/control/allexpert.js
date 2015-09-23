/**
 * Created by hulgy on 15/9/19.
 */
$(function(){
    AJAX.getAllCityAndCode({
        data:{},
        callback:function(data){
            console.log(data);
        }
    });
    AJAX.getRootLocation({
        callback:function(data){
            console.log(data);
        }
    });

});