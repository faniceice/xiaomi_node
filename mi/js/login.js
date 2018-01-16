$(".btn").click(function(){
    var u = $("#user_name").val();
    var p = $("#user_pwd").val();
    $.ajax({
        type:"POST",
        url:"http://127.0.0.1:3000/user/login",
        data:{user_name:u,user_pwd:p},
        xhrFields:{withCredentials:true},
        success:function(data){
            if(data.code>0){
                //alert(data.msg);
                location.href ="index.html";
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("登陆失败");
        }
    });

});