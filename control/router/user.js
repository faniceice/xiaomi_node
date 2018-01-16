//本模块和yonghu相关
const pool = require("../pool");
const express = require("express");
const bodyParser = require("body-parser");
let router = express.Router();

/**注册功能******/
router.post("/register",(req,res)=>{
    var user_name = req.body.user_name;
    var user_pwd  = req.body.user_pwd;//可能会出错
    pool.getConnection((err,conn)=>{
        if(err)throw err;
        var sql = "INSERT INTO mi_user VALUES(null,?,md5(?))";
        conn.query(sql,[user_name,user_pwd],(err,result)=>{
            if(err)throw err;
            if(result.affectedRows>0){
                res.json({code:1,msg:"注册成功"});
            }else{
                res.json({code:-1,msg:"注册失败"});
            }
            conn.release();
        });
    });
    //res.send("user_reg")
});
/*************登陆功能**********/
router.post("/login",(req,res)=>{
    var u = req.body.user_name;
    var p = req.body.user_pwd;
    pool.getConnection((err,conn)=>{
        if(err)throw err;
        var sql = "SELECT * FROM mi_user WHERE user_name=?";
        sql += " AND user_pwd=md5(?)";
        conn.query(sql,[u,p],(err,result)=>{
            console.log(result);
            if(result.length>0){
                var user_id = result[0].user_id;
                //session.user_id = user_id;
                //var user_name = result[0].user_name;
                //session.user_name = user_name;
                //console.log(req.session);
                //这就是session的id和session的user_name
                console.log(result[0].user_id);
                console.log(result[1].user_name);
                //console.log(user_name)

                //session_start();
                //SESSION['loginUname'] = result[1].user_name;
                //SESSION['loginUid'] = result[0].user_id;
               /*$pageToJump = @$_SESSION['pageToJump'];
                if($pageToJump==='cart.html' && @$_SESSION['toBuyLid']){
                    //完成购物车添加
                    $sql = "SELECT iid FROM mi_shoppingcart_item WHERE user_id=$_SESSION[loginUid] AND product_id=$_SESSION[toBuyLid]";
                    $result = mysqli_query($conn, $sql);
                    if( mysqli_fetch_row($result) ){
                        $sql = "UPDATE xz_shoppingcart_item SET count=count+1 WHERE user_id=$_SESSION[loginUid] AND product_id=$_SESSION[toBuyLid]";
                    }else {
                        $sql = "INSERT INTO xz_shoppingcart_item VALUES(NULL, $_SESSION[loginUid], $_SESSION[toBuyLid], $_SESSION[toBuyCount],false)";
                    }
                    $result = mysqli_query($conn, $sql);
                    unset($_SESSION['toBuyLid']);
                    unset($_SESSION['toBuyCount']);
                    unset($_SESSION['pageToJump']);*/



                    res.json({code:1,msg:"登录成功"});
            }else{
                res.json({code:-1,msg:"用户名或密码失败"});
            }
            conn.release();
        });
    });
   // res.send("uuuu")
});

router.get("/session",(req,res)=>{
    console.log(session);
    //if(!req.session.user_id){
    //       res.json({code:-2,msg:"请登录"});
    //        return;
    //session_start();
    //output['uid'] = req.session.user_id;
    //output['user_name'] = req.session.user_name;
//
    res.json(output);

    //res.send("user_update")
});
router.get("/logout",(req,res)=>{
    session_start();
    session_destroy();

    res.json ({"code":200, "msg":"logout succ"});

    //res.send("user_detail")
});
router.get("/search",(req,res)=>{
    res.send("user_search")
});
module .exports = router;