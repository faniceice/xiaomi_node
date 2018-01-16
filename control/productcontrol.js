//使用express创建web服务器
const http = require("http");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"07teducn"
}));
app.use(cors({
    origin:["http://127.0.0.1"],
    credentials:true
    //访问时带上cookie
}))
//1:连接池
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"mi",
    port:3306,
    connectionLimit:25
});
var server = http.createServer(app);
server.listen(8080);

//商品详情页
app.get("/productdetail",(req,res)=>{
    if(!req.session.user_id){
    res.json({code:-2,msg:"请登录"});
    return;
}
    var lid =req.body.lid;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "SELECT lid,title,subtitle,price,promise,(select md from mi_laptop_pic where laptop_id=lid limit 1) as md FROM mi_laptop where lid=lid";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.json({code:1,data:result});
            }else{
                res.json({code:-1,msg:"��¼������"});
            }
            conn.release();
        });
    });
});













