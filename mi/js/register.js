new Vue({
    el:'.msg',
    data:{
        isUserAgree:false
    }
})
$("#register").click(function(){
    var u = $("#user_name").val();
    var p = $("#user_pwd").val();
    $.ajax({
        type:"POST",
        url:"http://127.0.0.1:3000/user/register",
        data:{user_name:u,user_pwd:p},
        success:function(data){
            if(data.code>0){
                alert(data.msg);
                location.href = "login.html";
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("网络故障");
        }
    });
});