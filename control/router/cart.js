//本模块与购物车相关
//本模块和产品相关
const pool = require("../pool");
const express = require("express");
let router = express.Router();

router.get("/list",(req,res)=>{
    res.send("order_list")
});
router.get("/del",(req,res)=>{
    res.send("order_del")
});
router.get("/update",(req,res)=>{
    res.send("order_update")
});
router.get("/detail",(req,res)=>{
    res.send("order_detail")
});
router.get("/search",(req,res)=>{
    res.send("order_search")
});
module .exports = router;