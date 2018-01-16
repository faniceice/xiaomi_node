const http = require("http");
const express = require("express");
const mysql = require("mysql");
//处理post请求
const bodyParser = require("body-parser");
//session和cookie模块
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const routerProduct = require("./router/product");
const routerUser= require("./router/user");
const routerCart = require("./router/cart");

let app = express();
let server = http.createServer(app);
server.listen(3000);

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static("public"));
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:true,   //默认给cookie名字
    secret:"07teducn"    //不写不让过
}));
//跨域中间件
app.use(cors({
    origin:["http://127.0.0.1"],
    credentials:true              //访问时带上cookie
}));
app.use("/product",routerProduct);
app.use("/user",routerUser);
app.use("/cart",routerCart);

